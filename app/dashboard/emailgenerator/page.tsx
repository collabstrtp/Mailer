"use client";

import { useState } from "react";
import { extractTextFromFile } from "@/lib/clientTextExtractor";

export default function ColdMailPage() {
  const [contextText, setContextText] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [jd, setJd] = useState<File | null>(null);
  const [generatedMail, setGeneratedMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateColdMail = async () => {
    try {
      setLoading(true);
      setError("");
      setGeneratedMail("");

      let combinedText = contextText || "";

      if (resume) {
        const resumeText = await extractTextFromFile(resume);
        combinedText += `\n\nResume:\n${resumeText}`;
      }

      if (jd) {
        const jdText = await extractTextFromFile(jd);
        combinedText += `\n\nJob Description:\n${jdText}`;
      }

      const res = await fetch("/api/coldmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: combinedText }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      setGeneratedMail(data.email);
    } catch (err: any) {
      setError(err.message || "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Cold Email Generator</h1>

        {/* NOTES */}
        <textarea
          value={contextText}
          onChange={(e) => setContextText(e.target.value)}
          placeholder="Your info, skills, experience, notes..."
          className="w-full min-h-[120px] p-3 rounded bg-gray-800 outline-none"
        />

        {/* RESUME */}
        <input
          type="file"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
        {resume && <p className="text-xs text-gray-400">{resume.name}</p>}

        {/* JD */}
        <input
          type="file"
          onChange={(e) => setJd(e.target.files?.[0] || null)}
        />
        {jd && <p className="text-xs text-gray-400">{jd.name}</p>}

        <button
          onClick={generateColdMail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate Cold Email"}
        </button>

        {error && <p className="text-red-400">{error}</p>}

        {generatedMail && (
          <textarea
            value={generatedMail}
            readOnly
            className="w-full min-h-[220px] p-3 rounded bg-gray-800 outline-none"
          />
        )}
      </div>
    </div>
  );
}
