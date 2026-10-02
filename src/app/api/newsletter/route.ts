import { NextResponse } from "next/server";

/**
 * Newsletter subscription endpoint.
 *
 * This reference implementation validates and acknowledges the request so the
 * form has a real loading / success / error cycle. Connect a provider here
 * (see the README) before launching the newsletter for real.
 */
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Intentionally no persistence in the template. Wire a provider here.
  console.info("newsletter subscription requested:", email.trim());

  return NextResponse.json({
    message: "You are on the list. Look out for the next dispatch on Monday.",
  });
}
