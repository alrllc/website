import { NextResponse } from "next/server";
import { saveConsultationSubmission } from "@/lib/submissions";

type ConsultationRequest = {
  name?: string;
  email?: string;
  goal?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ConsultationRequest;

  try {
    payload = (await request.json()) as ConsultationRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const goal = payload.goal?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !goal || !message) {
    return NextResponse.json(
      { error: "Please complete every field." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const consultation = {
    name,
    email,
    goal,
    message,
    receivedAt: new Date().toISOString(),
  };

  await saveConsultationSubmission(consultation);
  console.info("New ALR LLC consultation request", consultation);

  return NextResponse.json({ ok: true });
}
