import { NextRequest, NextResponse } from "next/server";
import { sendMailController } from "@/controllers/email.controller";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    await sendMailController(formData);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Email sending failed" },
      { status: 500 }
    );
  }
}
