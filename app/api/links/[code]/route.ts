import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface Params {
  code: string;
}

// GET a single link by code
export async function GET(req: Request, context: { params: Params | Promise<Params> }) {
  try {
    const resolvedParams: Params = await context.params; // unwrap Promise if needed
    const { code } = resolvedParams;

    const result = await db.select().from(links).where(eq(links.code, code));
    if (result.length === 0) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    return NextResponse.json(result[0], { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('GET /api/links/[code] error:', errorMessage);
    return NextResponse.json({ error: 'Failed to fetch link details' }, { status: 500 });
  }
}

// DELETE a link by code
export async function DELETE(req: Request, context: { params: Params | Promise<Params> }) {
  try {
    const resolvedParams: Params = await context.params; // unwrap Promise
    const { code } = resolvedParams;

    console.log('DELETE called with code:', code);

    const found = await db.select().from(links).where(eq(links.code, code));
    if (found.length === 0) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    await db.delete(links).where(eq(links.code, code));
    return NextResponse.json({ message: 'Link deleted successfully', code }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('DELETE /api/links/[code] error:', errorMessage);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
