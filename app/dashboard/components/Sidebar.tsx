import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold border-b">
        Mailer
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>

        <Link href="/dashboard/sendmail" className="block px-4 py-2 rounded hover:bg-gray-100">
          Send Mail
        </Link>

        <Link href="/dashboard/history" className="block px-4 py-2 rounded hover:bg-gray-100">
          Mail History
        </Link>

        <Link href="/dashboard/emailgenerator" className="block px-4 py-2 rounded hover:bg-gray-100">
          Email Generator
        </Link>
      </nav>
    </aside>
  );
}
