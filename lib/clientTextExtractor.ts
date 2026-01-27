import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import * as worker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

// ✅ Tell pdf.js where the worker is
pdfjsLib.GlobalWorkerOptions.workerSrc =
  (worker as any).default ?? worker;

export async function extractTextFromFile(file: File): Promise<string> {
  // ---------- PDF ----------
  if (file.type === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ");
    }

    return text;
  }

  // ---------- DOC / DOCX ----------
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword"
  ) {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  // ---------- IMAGE OCR ----------
  if (file.type.startsWith("image/")) {
    const Tesseract = await import("tesseract.js");
    const result = await Tesseract.recognize(file, "eng");
    return result.data.text;
  }

  throw new Error("Unsupported file type");
}
