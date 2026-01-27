export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Total Mails</p>
        <p className="text-2xl font-bold">120</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Sent</p>
        <p className="text-2xl font-bold text-green-600">110</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-sm text-gray-500">Failed</p>
        <p className="text-2xl font-bold text-red-600">10</p>
      </div>
    </div>
  );
}
