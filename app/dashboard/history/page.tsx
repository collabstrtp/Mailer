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

                const res = await fetch("/api/mail", {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });

                const data = await res.json();
                console.log(data)

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch mails");
                }

                setMails(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMails();
    }, []);

    if (loading) return <p className="text-white">Loading mails...</p>;
    if (error) return <p className="text-red-400">{error}</p>;

    // ---------- Pagination logic ----------
    const totalPages = Math.ceil(mails.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMails = mails.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <div className="bg-gray-900 min-h-screen p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Mail History</h1>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <th className="p-3 text-left">To</th>
                            <th className="p-3 text-left">Subject</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentMails.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-400">
                                    No emails found
                                </td>
                            </tr>
                        )}

                        {currentMails.map((mail) => (
                            <tr
                                key={mail._id}
                                className="border-t border-gray-800 hover:bg-gray-800/50"
                            >
                                <td className="p-3">{mail.receiverEmail}</td>
                                <td className="p-3">{mail.subject}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${mail.status === "failed"
                                                ? "bg-red-600/20 text-red-400"
                                                : "bg-green-600/20 text-green-400"
                                            }`}
                                    >
                                        {(mail.status || "sent").toUpperCase()}
                                    </span>

                                </td>
                                <td className="p-3 text-gray-400">
                                    {new Date(mail.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                    ? "bg-blue-600"
                                    : "bg-gray-700"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
