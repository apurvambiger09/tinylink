import { db } from "@/lib/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> } 
) {
  // Unwrap params
  const { code } = await context.params;

  // Fetch link from DB
  const result = await db.select().from(links).where(eq(links.code, code));

  if (result.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const link = result[0];

  // Update clicks & lastClicked
  await db
    .update(links)
    .set({ clicks: link.clicks + 1, lastClicked: new Date() })
    .where(eq(links.code, code));

  // Return proper 302 redirect
  return new Response(null, {
    status: 302,
    headers: {
      Location: link.url,
    },
  });
}


