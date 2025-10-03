export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getDeviceId } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  try {
    console.log('GET /api/decks - Starting request');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

    const deviceId = getDeviceId(req);
    console.log('Device ID:', deviceId);

    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });

    console.log('Executing query...');
    // Get both user's decks and starter decks
    const res = await query(
      `select d.id, d.title, d.description, d.color, d.created_at, d.device_id,
              count(c.id)::int as card_count,
              case when d.device_id = 'starter-decks-system' then true else false end as is_starter
         from decks d
    left join cards c on c.deck_id = d.id
        where d.device_id = $1 or d.device_id = 'starter-decks-system'
     group by d.id
     order by is_starter desc, d.created_at desc`,
      [deviceId]
    );
    console.log('Query successful, rows:', res.rows.length);
    return NextResponse.json({ decks: res.rows });
  } catch (error) {
    console.error('GET /api/decks error:', error);
    return NextResponse.json({ error: 'Database error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const deviceId = getDeviceId(req);
    if (!deviceId) return NextResponse.json({ error: 'Missing device id' }, { status: 400 });

    const { title, description, color } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });

    const res = await query(
      'insert into decks (device_id, title, description, color) values ($1,$2,$3,$4) returning *',
      [deviceId, title.trim(), description ?? null, color ?? '#6B4EFF']
    );
    return NextResponse.json({ deck: res.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/decks error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}
