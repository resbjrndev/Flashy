export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getDeviceId } from '@/lib/api-helpers';

export async function GET(req: NextRequest, { params }: { params: { deckId: string } }) {
  const deviceId = getDeviceId(req);
  if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });

  // Allow viewing user's own decks and starter decks
  const res = await query(
    `select d.id, d.title, d.description, d.created_at, d.device_id,
            count(c.id)::int as card_count
       from decks d
  left join cards c on c.deck_id = d.id
      where d.id = $1 and (d.device_id = $2 or d.device_id = 'starter-decks-system')
   group by d.id`,
    [params.deckId, deviceId]
  );

  if (!res.rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ deck: res.rows[0] });
}

export async function PUT(req: NextRequest, { params }: { params: { deckId: string } }) {
  const deviceId = getDeviceId(req);
  if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });

  const { title, description } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });

  const res = await query(
    'update decks set title=$1, description=$2 where id=$3 and device_id=$4 returning *',
    [title.trim(), description ?? null, params.deckId, deviceId]
  );

  if (!res.rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ deck: res.rows[0] });
}

export async function DELETE(req: NextRequest, { params }: { params: { deckId: string } }) {
  const deviceId = getDeviceId(req);
  if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });

  const res = await query('delete from decks where id=$1 and device_id=$2 returning id', [
    params.deckId,
    deviceId,
  ]);
  if (!res.rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
