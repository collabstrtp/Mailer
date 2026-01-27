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
          extractedText += `\n\nResume:\n${await runOCR(resume)}`;
        }
      } else {
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

    // ---------- PROMPT ----------
    const prompt = `
Write a short, professional cold email using the following information:

${extractedText}

Guidelines:
- Professional tone
- Concise
- Suitable for job application
`;

    let email = "";

    // ===============================
    // 🔹 TRY GROQ FIRST
    // ===============================
    try {
      const groqRes = await fetch(
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

      const groqData = await groqRes.json();

      if (groqRes.ok) {
        email =
          groqData?.choices?.[0]?.message?.content ||
          groqData?.choices?.[0]?.text ||
          "";
      } else {
        console.warn("Groq failed, falling back to Gemini:", groqData);
      }
    } catch (err) {
      console.warn("Groq error, falling back to Gemini:", err);
    }

    // ===============================
    // 🔹 FALLBACK TO GEMINI
    // ===============================
    if (!email) {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const geminiData = await geminiRes.json();

      if (!geminiRes.ok) {
        throw new Error(
          geminiData?.error?.message || "Gemini API failed"
        );
      }

      email =
        geminiData?.candidates?.[0]?.content?.parts
          ?.map((p: any) => p.text)
          .join("") || "";
    }

    return NextResponse.json({ success: true, email });
  } catch (err: any) {
    console.error("Coldmail error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
