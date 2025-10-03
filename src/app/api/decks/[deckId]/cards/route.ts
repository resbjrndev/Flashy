export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getDeviceId } from '@/lib/api-helpers';

async function deckAccessible(deckId: string, deviceId: string) {
  // Allow access to user's own decks and starter decks
  const r = await query(
    'select 1 from decks where id=$1 and (device_id=$2 or device_id=$3)',
    [deckId, deviceId, 'starter-decks-system']
  );
  return r.rows.length > 0;
}

async function deckOwned(deckId: string, deviceId: string) {
  // Only allow modifying user's own decks (not starter decks)
  const r = await query('select 1 from decks where id=$1 and device_id=$2', [deckId, deviceId]);
  return r.rows.length > 0;
}

export async function GET(req: NextRequest, { params }: { params: { deckId: string } }) {
  try {
    const deviceId = getDeviceId(req);
    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });
    if (!(await deckAccessible(params.deckId, deviceId))) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const res = await query('select * from cards where deck_id=$1 order by created_at asc', [params.deckId]);
    return NextResponse.json({ cards: res.rows });
  } catch (error) {
    console.error('GET /api/decks/[deckId]/cards error:', error);
    return NextResponse.json({ error: 'Database error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { deckId: string } }) {
  try {
    const deviceId = getDeviceId(req);
    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });
    if (!(await deckOwned(params.deckId, deviceId))) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { front, back } = await req.json();
    if (!front?.trim() || !back?.trim()) return NextResponse.json({ error: 'Front/back required' }, { status: 400 });

    const res = await query(
      'insert into cards (deck_id, front, back) values ($1,$2,$3) returning *',
      [params.deckId, front.trim(), back.trim()]
    );
    return NextResponse.json({ card: res.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/decks/[deckId]/cards error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}
