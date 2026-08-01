import { NextResponse } from "next/server";

const requiredFields = ["name", "phone", "course", "consent"] as const;

export async function POST(request: Request) {
  const data = await request.json() as Record<string, string>;
  if (data.website || requiredFields.some((field) => !data[field])) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const endpoint = process.env.GOOGLE_ADMISSIONS_WEBHOOK_URL;
  const token = process.env.GOOGLE_ADMISSIONS_WEBHOOK_TOKEN;
  if (!endpoint || !token) return NextResponse.json({ error: "Admissions is not configured" }, { status: 503 });

  try {
    const payload = JSON.stringify({ ...data, token, submittedAt: new Date().toISOString() });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payload.length.toString()
      },
      body: payload,
      redirect: "follow"
    });

    const responseText = await response.text();
    console.log("Google Apps Script response:", response.status, responseText);

    if (!response.ok) {
      console.error("Failed to save submission:", response.status, responseText);
      return NextResponse.json({ error: "Unable to save submission" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error submitting to Google Apps Script:", error);
    return NextResponse.json({ error: "Unable to save submission" }, { status: 502 });
  }
}
