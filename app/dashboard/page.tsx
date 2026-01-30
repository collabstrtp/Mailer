"use client";

import { useMe } from "@/hooks/useMe";
import { Mail, Send, XCircle } from "lucide-react";

export default function DashboardPage() {
  const { data, loading, error } = useMe();

  if (loading)
    return <p className="text-gray-500">Loading dashboard...</p>;
  if (error)
    return <p className="text-red-500">{error}</p>;

  const stats = data?.mailStats;

  return (
    <div className="min-h-screen">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
      {/* Total Mails */}
      <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4 pb-10">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <Mail size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Mails</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats?.totalMails ?? 0}
          </p>

        </div>
      </div>

      {/* Sent Mails */}
      <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4 pb-10">
        <div className="p-3 rounded-full bg-green-100 text-green-600">
          <Send size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Sent</p>
          <p className="text-2xl font-bold text-green-600">
            {stats?.totalSent ?? 0}
          </p>
        </div>
      </div>

      {/* Failed Mails */}
      <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4 pb-10">
        <div className="p-3 rounded-full bg-red-100 text-red-600">
          <XCircle size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Failed</p>
          <p className="text-2xl font-bold text-red-600">
            {stats?.totalFailed ?? 0}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
