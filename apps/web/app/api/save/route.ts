// apps/web/app/api/save/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export async function POST(req: Request) {
  const { prompt, score } = await req.json();

  if (!prompt || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const id = uuidv4();
  const timestamp = new Date().toISOString();

  try {
    db.prepare(`
      INSERT INTO prompt_scores (id, prompt, score, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(id, prompt, score, timestamp);

    return NextResponse.json({ message: 'Saved successfully' });
  } catch (err) {
    console.error('Error saving record:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
