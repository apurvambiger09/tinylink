import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';

// ---------------------------------------------------
// GET /api/links  → List all short links
// ---------------------------------------------------
export async function GET() {
	try {
		const allLinks = await db.select().from(links);
		return NextResponse.json(allLinks, { status: 200 });
	} catch (error) {
		console.error('GET /api/links error:', error);
		return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
	}
}

// ---------------------------------------------------
// POST /api/links  → Create a new short link
// Body: { code: string, url: string }
// ---------------------------------------------------
export async function POST(req: Request) {
  try {
    const { code, url }: { code: string; url: string } = await req.json();

    if (!code || !url) {
      return NextResponse.json(
        { error: "Code and URL are required" },
        { status: 400 }
      );
    }

    const existing = await db.select().from(links).where(eq(links.code, code));
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }

    await db.insert(links).values({ code, url });

    return NextResponse.json(
      { message: "Link created successfully", code, url },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/links error:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}
