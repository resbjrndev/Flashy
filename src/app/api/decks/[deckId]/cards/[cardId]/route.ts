export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getDeviceId } from '@/lib/api-helpers';

async function deckOwned(deckId: string, deviceId: string) {
  const r = await query('select 1 from decks where id=$1 and device_id=$2', [deckId, deviceId]);
  return r.rows.length > 0;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { deckId: string; cardId: string } }
) {
  try {
    const deviceId = getDeviceId(req);
    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });
    if (!(await deckOwned(params.deckId, deviceId)))
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { front, back } = await req.json();
    if (!front?.trim() || !back?.trim())
      return NextResponse.json({ error: 'Front/back required' }, { status: 400 });

    const res = await query(
      'update cards set front=$1, back=$2 where id=$3 and deck_id=$4 returning *',
      [front.trim(), back.trim(), params.cardId, params.deckId]
    );

    if (!res.rows.length) return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    return NextResponse.json({ card: res.rows[0] });
  } catch (error) {
    console.error('PUT /api/decks/[deckId]/cards/[cardId] error:', error);
    return NextResponse.json(
      { error: 'Database error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { deckId: string; cardId: string } }
) {
  try {
    const deviceId = getDeviceId(req);
    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });
    if (!(await deckOwned(params.deckId, deviceId)))
      return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const res = await query('delete from cards where id=$1 and deck_id=$2 returning id', [
      params.cardId,
      params.deckId,
    ]);

    if (!res.rows.length) return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/decks/[deckId]/cards/[cardId] error:', error);
    return NextResponse.json(
      { error: 'Database error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
