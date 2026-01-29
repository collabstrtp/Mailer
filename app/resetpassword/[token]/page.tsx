"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error">("error");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageType("error");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/auth/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });
            if (res.ok) {
                setMessage("Password reset successfully! Redirecting to login...");
                setMessageType("success");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                const data = await res.json();
                setMessage(data.message || "Failed to reset password");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Mailer</h1>
                    <p className="text-gray-600 mt-2">AI-Powered Email Automation</p>
                </div>

                {/* Reset Password Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Reset Password
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm">
                            Enter your new password below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Message Display */}
                        {message && (
                            <div
                                className={`p-4 rounded-xl text-sm font-medium ${messageType === "success"
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : "bg-red-50 text-red-800 border border-red-200"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {messageType === "success" ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    <span>{message}</span>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                            text-white font-semibold shadow-lg shadow-blue-500/30
                            hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]
                            active:scale-[0.98] transition-all duration-200 ease-out
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Resetting Password...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        {/* Back to Login Link */}
                        <div className="text-center pt-2">
                            <Link
                                href="/login"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Security Note */}
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm font-medium text-blue-900">Security Tip</p>
                            <p className="text-xs text-blue-700 mt-1">
                                Choose a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}