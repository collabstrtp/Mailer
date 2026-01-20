import { NextRequest, NextResponse } from "next/server";
import { sendMailController } from "@/controllers/email.controller";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { decryptPassword } from "@/lib/encryption";

export async function POST(req: NextRequest) {
  console.log("Received request to /api/mail");
  console.log(
    "Authorization header:",
    req.headers.get("authorization") ? "present" : "missing",
  );

  try {
    // Check authorization
    const token =
      req.cookies.get("token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 },
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret) as any;
      console.log("Token verified successfully:", decoded);
    } catch (verifyError: any) {
      console.error("Token verification failed:", verifyError.message);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get user from database
    await connectDB();
    const user = await User.findById(decoded.userId).select(
      "+emailAppPassword",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Decrypt the email app password
    const decryptedPassword = decryptPassword(user.emailAppPassword);

    const formData = await req.formData();
    const result = await sendMailController(formData, {
      userEmail: user.email,
      emailAppPassword: decryptedPassword,
    });
    console.log("Email sent successfully");
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      sentTo: result?.sentTo,
    });
  } catch (err: any) {
    console.error("Email sending error:", err.message);
    return NextResponse.json(
      { success: false, message: err.message || "Email sending failed" },
      { status: 500 },
    );
  }
}
