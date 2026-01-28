"use client";

import { useMe } from "@/hooks/useMe";

export default function DashboardPage() {
  const { data, loading, error } = useMe();

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const stats = data?.mailStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Total Mails</p>
        <p className="text-2xl font-bold">{stats?.totalMails ?? 0}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Sent</p>
        <p className="text-2xl font-bold text-green-600">
          {stats?.totalSent ?? 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Failed</p>
        <p className="text-2xl font-bold text-red-600">
          {stats?.totalFailed ?? 0}
        </p>
      </div>
    </div>
  );
}
