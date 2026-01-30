"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import { toast } from "sonner";
import Image from "next/image";
import logoo from "@/public/logoo.png";


export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-blue-600 text-white hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-blue-500 flex items-center gap-2">

        <Image
          src={logoo}
          alt="Mailer Logo"
          width={140}
          height={140}
          priority

        />
      </div>

      <nav className="flex-1 p-4 space-y-2 flex flex-col">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        <Link
          href="/dashboard/sendmail"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Mail
        </Link>

        <Link
          href="/dashboard/history"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mail History
        </Link>

        <Link
          href="/dashboard/emailgenerator"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Email Generator
        </Link>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </Link>

        {/* Spacer to push logout to bottom */}
        <div className="flex-1" />

        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors border-t border-blue-500 mt-2 pt-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>
    </aside>
  );
}