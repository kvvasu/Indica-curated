import { NextResponse } from "next/server";

/**
 * Contact endpoint. Validates server-side as well as in the browser (never
 * trust the client) and returns a clear message for the form's status region.
 */
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic : "general";

  if (name.length < 2) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json(
      { message: "Please give us at least 20 characters of context." },
      { status: 400 },
    );
  }

  console.info("contact message received:", { name, email, topic, length: message.length });

  return NextResponse.json({
    message: "Thanks — we have your message and will reply within two working days.",
  });
}
