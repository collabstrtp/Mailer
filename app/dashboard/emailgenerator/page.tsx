"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ColdMailPage() {
  const router = useRouter();

  const [contextText, setContextText] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [jd, setJd] = useState<File | null>(null);

  const [generatedSubject, setGeneratedSubject] = useState("");
  const [generatedMail, setGeneratedMail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // Generate Cold Email
  // ---------------------------
  const generateColdMail = async () => {
    try {
      setLoading(true);
      setError("");
      setGeneratedMail("");
      setGeneratedSubject("");

      const formData = new FormData();
      formData.append("context", contextText);
      if (resume) formData.append("resume", resume);
      if (jd) formData.append("jd", jd);

      const res = await fetch("/api/mail/coldmail", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to generate email");
      }

      setGeneratedSubject(data.subject || "");
      setGeneratedMail(data.email || "");
    } catch (err: any) {
      setError(err.message || "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Copy Email Body
  // ---------------------------
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedMail);
    alert("Copied to clipboard ✅");
  };

  // ---------------------------
  // Go to Send Mail Page
  // ---------------------------
  const goToSendPage = () => {
    localStorage.setItem(
      "generatedColdMailData",
      JSON.stringify({
        subject: generatedSubject,
        body: generatedMail,
      })
    );

    router.push("/dashboard/sendmail");
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Cold Email Generator</h1>

        {/* CONTEXT */}
        <textarea
          value={contextText}
          onChange={(e) => setContextText(e.target.value)}
          placeholder="Your skills, experience, notes, company info..."
          className="w-full min-h-[120px] p-3 rounded border outline-none"
        />

        {/* RESUME */}
        <div>
          <label className="block text-sm mb-1">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </div>

        {/* JOB DESCRIPTION */}
        <div>
          <label className="block text-sm mb-1">
            Upload Job Description (optional)
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setJd(e.target.files?.[0] || null)}
          />
        </div>

        {/* GENERATE BUTTON */}
        <button
          onClick={generateColdMail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Cold Email"}
        </button>

        {/* ERROR */}
        {error && <p className="text-red-600">{error}</p>}

        {/* RESULT */}
        {generatedMail && (
          <div className="space-y-3">
            {/* SUBJECT PREVIEW */}
            {generatedSubject && (
              <input
                value={generatedSubject}
                readOnly
                className="w-full p-3 rounded border bg-gray-50 font-medium"
              />
            )}

            {/* EMAIL BODY */}
            <textarea
              value={generatedMail}
              readOnly
              className="w-full min-h-[220px] p-3 rounded border outline-none"
            />

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Copy
              </button>

              <button
                onClick={goToSendPage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
