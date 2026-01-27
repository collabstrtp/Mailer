"use client";

import { useState } from "react";

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

    const formData = new FormData();
    formData.append("context", contextText);

    if (resume) formData.append("resume", resume);
    if (jd) formData.append("jd", jd);

    const res = await fetch("/api/coldmail", {
      method: "POST",
      body: formData,
    });

    // ✅ THIS WAS MISSING
    const data = await res.json();
    console.log("API response:", data);

    if (!data.success) {
      throw new Error(data.message || "Failed");
    }

    // ✅ THIS DISPLAYS THE OUTPUT
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

        {/* NOTES / CONTEXT */}
        <textarea
          value={contextText}
          onChange={(e) => setContextText(e.target.value)}
          placeholder="Your info, skills, experience, notes..."
          className="w-full min-h-[120px] p-3 rounded bg-gray-800 outline-none"
        />

        {/* RESUME */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Upload Resume (PDF / Image)
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
          {resume && (
            <p className="text-xs text-gray-400 mt-1">{resume.name}</p>
          )}
        </div>

        {/* JOB DESCRIPTION */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Upload Job Description (Optional)
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setJd(e.target.files?.[0] || null)}
          />
          {jd && <p className="text-xs text-gray-400 mt-1">{jd.name}</p>}
        </div>

        {/* BUTTON */}
        <button
          onClick={generateColdMail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-6 py-2 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate Cold Email"}
        </button>

        {/* ERROR */}
        {error && <p className="text-red-400">{error}</p>}

        {/* RESULT */}
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
