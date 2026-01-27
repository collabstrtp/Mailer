import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const resume = formData.get("resume") as File | null;
    const jd = formData.get("jd") as File | null;
    const context = (formData.get("context") as string) || "";

    let extractedText = context.trim();

    // Safe pdf-parse import (no test files issue)
    const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;

    // ---------- OCR.space helper ----------
    const runOCR = async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("language", "eng");
      fd.append("isOverlayRequired", "false");

      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          apikey: process.env.OCR_SPACE_KEY!,
        },
        body: fd,
      });

      const data = await res.json();

      return (
        data?.ParsedResults
          ?.map((r: any) => r.ParsedText)
          .join("\n")
          .trim() || ""
      );
    };

    // ---------- RESUME ----------
    if (resume) {
      if (resume.type === "application/pdf") {
        try {
          const buffer = Buffer.from(await resume.arrayBuffer());
          const data = await pdfParse(buffer);

          if (data.text && data.text.trim().length > 50) {
            extractedText += `\n\nResume:\n${data.text}`;
          } else {
            extractedText += `\n\nResume:\n${await runOCR(resume)}`;
          }
        } catch {
          // broken PDF → OCR
          extractedText += `\n\nResume:\n${await runOCR(resume)}`;
        }
      } else {
        // image resume
        extractedText += `\n\nResume:\n${await runOCR(resume)}`;
      }
    }

    // ---------- JOB DESCRIPTION ----------
    if (jd) {
      extractedText += `\n\nJob Description:\n${await runOCR(jd)}`;
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { success: false, message: "No text extracted" },
        { status: 400 }
      );
    }

    // ---------- GROQ ----------
    const prompt = `
Write a short, professional cold email using the following information:

${extractedText}

Guidelines:
- Professional tone
- Concise
- Suitable for job application
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Groq API failed");
    }

    const email =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "";

    return NextResponse.json({ success: true, email });
  } catch (err: any) {
    console.error("Coldmail error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
