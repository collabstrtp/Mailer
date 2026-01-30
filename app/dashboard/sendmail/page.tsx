"use client";

import { useState } from "react";
import { Send, Paperclip, Mail } from "lucide-react";
import { getToken } from "@/utils/auth";

export default function SendEmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const recipients = to
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const sendEmail = async () => {
    if (!to || !subject || !body) {
      setMessage("Please fill all required fields");
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
      const headers: any = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch("/api/mail/sentMail", {
        method: "POST",
        body: formData,
        headers,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Email sent successfully");
        setTo("");
        setSubject("");
        setBody("");
        setResume(null);
        setCoverLetter(null);
      } else {
        setMessage(data.message || "Failed to send email");
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 text-gray-900">
    <div className="max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="p-4 rounded-full bg-blue-600 text-white w-fit">
          <Mail size={26} />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Email Sender
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Send emails to multiple recipients
          </p>
        </div>
      </div>

      {/* Recipients */}
      <div className="bg-white rounded-xl p-4 sm:p-4 shadow-md border border-gray-200 space-y-1">
        <p className="text-sm font-semibold text-gray-800">
          Recipients
        </p>

        <input
          type="text"
          placeholder="john@company.com, jane@startup.io"
          className="
            w-full rounded-lg px-4 py-2
            border border-gray-500
            bg-white
            text-gray-900
            placeholder:text-gray-400
            outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
          "
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* Recipient Chips */}
        <div className="flex flex-wrap gap-2">
          {recipients.map((email, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm"
            >
              {email}
            </span>
          ))}
        </div>
      </div>

      {/* Subject & Body */}
      <div className="bg-white rounded-xl p-4 sm:p-4 shadow-md border border-gray-200 space-y-4">
        <input
          type="text"
          placeholder="Subject"
          className="
            w-full rounded-lg px-4 py-2
            border border-gray-500
            bg-white
            text-gray-900
            placeholder:text-gray-400
            outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
          "
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Write your email here..."
          className="
            w-full rounded-lg px-4 py-3
            min-h-[140px] sm:min-h-[180px]
            border border-gray-500
            bg-white
            text-gray-900
            placeholder:text-gray-400
            outline-none
            resize-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
          "
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      {/* Attachments */}
      <div className="bg-white rounded-xl p-4 sm:p-4 shadow-md border border-gray-200 space-y-4">
        <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Paperclip size={16} />
          Attachments
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="file"
            className="text-sm text-gray-700"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
          <input
            type="file"
            className="text-sm text-gray-700"
            onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
          />
        </div>

        {(resume || coverLetter) && (
          <p className="text-sm text-gray-600">
            {resume?.name}
            {coverLetter && `, ${coverLetter.name}`}
          </p>
        )}
      </div>

      {/* Send Button */}
      <button
        onClick={sendEmail}
        disabled={loading}
        className="
          w-full py-3 sm:py-4 rounded-xl
          font-semibold text-base sm:text-lg
          text-white
          flex items-center justify-center gap-2
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:opacity-90 transition
          disabled:opacity-60
        "
      >
        <Send size={18} />
        {loading ? "Sending..." : "Send to All Recipients"}
      </button>

      {message && (
        <p className="text-center text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  </div>
);

}
