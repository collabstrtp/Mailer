"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/utils/auth";

type Mail = {
  _id: string;
  receiverEmail: string;
  subject: string;
  status: "sent" | "failed";
  createdAt: string;
  errorMessage?: string;
};

const ITEMS_PER_PAGE = 10;

export default function MailHistoryPage() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const token = getToken();
        const res = await fetch("/api/mail/getMail", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        setMails(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  if (loading) return <p className="p-6 text-gray-600">Loading mails...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const totalPages = Math.ceil(mails.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMails = mails.slice(startIndex, startIndex + ITEMS_PER_PAGE);

return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 text-gray-900">
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header (same as ColdMail) */}
      <h1 className="text-xl sm:text-2xl font-bold">
        Mail History
      </h1>

      {/* Table Wrapper */}
      <div className="bg-white rounded-xl shadow border border-gray-200">
        
        {/* X Scroll Container */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm sm:text-base">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  To
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Subject
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {currentMails.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No emails found
                  </td>
                </tr>
              )}

              {currentMails.map((mail) => (
                <tr
                  key={mail._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    {mail.receiverEmail}
                  </td>

                  <td className="px-4 py-4 max-w-[360px] truncate">
                    {mail.subject || "-"}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        mail.status === "failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {mail.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                    {new Date(mail.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (same feel as ColdMail buttons) */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border bg-white text-sm disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border bg-white text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  </div>
);


}
