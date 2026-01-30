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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 text-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Cold Email Generator
        </h1>

        {/* Context */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow border border-gray-200 space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Context
          </label>
          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            placeholder="Your skills, experience, company info..."
            className="w-full min-h-[140px] sm:min-h-[180px]
              border border-gray-300 rounded-lg p-3
              text-gray-900 placeholder:text-gray-400
              outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Uploads */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resume
            </label>
            <input
              type="file"
              accept=".pdf,image/*"
              className="text-sm text-gray-700"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
            {resume && (
              <p className="text-xs text-gray-500 mt-1">
                {resume.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Description (optional)
            </label>
            <input
              type="file"
              accept=".pdf,image/*"
              className="text-sm text-gray-700"
              onChange={(e) => setJd(e.target.files?.[0] || null)}
            />
            {jd && (
              <p className="text-xs text-gray-500 mt-1">
                {jd.name}
              </p>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateColdMail}
          disabled={loading}
          className="
            w-full sm:w-auto
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-semibold
            hover:opacity-90 transition
            disabled:opacity-60
          "
        >
          {loading ? "Generating..." : "Generate Cold Email"}
        </button>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {/* Result */}
        {generatedMail && (
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow border border-gray-200 space-y-4">

            {generatedSubject && (
              <input
                value={generatedSubject}
                readOnly
                className="
                  w-full p-3 rounded-lg
                  border border-gray-300
                  bg-gray-50 font-medium
                "
              />
            )}

            <textarea
              value={generatedMail}
              readOnly
              className="
                w-full min-h-[200px] sm:min-h-[260px]
                p-3 rounded-lg
                border border-gray-300
                bg-white
                outline-none resize-none
              "
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Copy
              </button>

              <button
                onClick={goToSendPage}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
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
