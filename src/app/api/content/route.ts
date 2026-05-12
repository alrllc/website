import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

function hasRequiredShape(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const content = value as Partial<SiteContent>;
  return Boolean(
    content.brand &&
      content.hero &&
      content.services &&
      content.vision &&
      content.contact,
  );
}

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!hasRequiredShape(payload)) {
    return NextResponse.json(
      { error: "Content is missing required website sections." },
      { status: 400 },
    );
  }

  await saveSiteContent(payload);
  return NextResponse.json({ ok: true });
}
