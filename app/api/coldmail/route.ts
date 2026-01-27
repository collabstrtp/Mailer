import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { context } = await req.json();

    if (!context) {
      return NextResponse.json(
        { success: false, message: "Context missing" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [{ role: "user", content: context }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      email: data.choices[0].message.content,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
