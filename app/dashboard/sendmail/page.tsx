"use client";

import { useState } from "react";
import { getToken } from "@/utils/auth";

export default function SendEmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  const sendEmail = async () => {
    if (!to || !subject || !body) {
      setMessage("Please fill To, Subject and Body");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("to", to);
      formData.append("subject", subject);
      formData.append("body", body);

      if (resume) formData.append("resume", resume);
      if (coverLetter) formData.append("coverLetter", coverLetter);

      const token = getToken();
      console.log("Sendmail: Retrieved token:", token ? "present" : "missing");
      if (token) {
        console.log("Token length:", token.length);
        console.log("Token preview:", token.substring(0, 50) + "...");
      }

      const headers: any = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      console.log("Sending request with headers:", { Authorization: headers.Authorization ? "present" : "missing" });

      const res = await fetch("/api/mail", {
        method: "POST",
        body: formData,
        headers,
      });
      console.log("Sendmail: Response status:", res.status);

      if (res.status === 401) {
        const errorData = await res.json();
        console.log("401 Error details:", errorData);
      }

      const data = await res.json();
      if (data.success) {
        setMessage(`Email sent to ${data.sentTo || "recipients"} successfully`);
        setTo("");
        setSubject("");
        setBody("");
        setResume(null);
        setCoverLetter(null);
      } else {
        setMessage(data.message || "Failed to send email");
      }
    } catch (err) {
      setMessage("Server error while sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
      <div className="bg-gray-200 p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg">
        <h1 className="text-xl font-bold text-center">Bulk Email Sender</h1>

        <input
          type="text"
          placeholder="Emails (comma separated)"
          className="w-full p-2 rounded bg-gray-100 outline-none"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-2 rounded bg-gray-100 outline-none"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Email Body"
          className="w-full p-2 rounded bg-gray-100 outline-none min-h-[120px]"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Resume (optional)</label>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />

          <label className="block text-sm text-gray-300">
            Cover Letter (optional)
          </label>
          <input
            type="file"
            onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>

        <button
          onClick={sendEmail}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {loading ? "Sending..." : "Send Email"}
        </button>


        {message && (
          <p className="text-center text-sm text-green-400 mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}
