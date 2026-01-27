// IMPORTANT:
// - Use pdfjs-dist/legacy
// - Import dynamically to avoid SSR crashes

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

    // ✅ Correct worker setup (NO CDN)
    const workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.js",
      import.meta.url
    );
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc.toString();

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

  // other handlers unchanged…
}

