export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const r = await query<{ now: string }>('select now()::text as now');
    return NextResponse.json({ ok: true, db_time: r.rows[0].now });
  } catch (e: any) {
    console.error('Health check error:', e);
    const errorMsg = e?.message || e?.toString() || JSON.stringify(e) || 'unknown error';
    return NextResponse.json({
      ok: false,
      error: errorMsg,
      errorCode: e?.code,
      errorName: e?.name,
    }, { status: 500 });
  }
}