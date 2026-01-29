"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/utils/auth";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const verified = searchParams.get("verified");

    useEffect(() => {
        if (verified) {
            toast.success("Email verified successfully. Please login.");
        }
    }, [verified]);

    const { email, password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", formData);
            setToken(response.data.token);
            toast.success(response.data.message);
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Login failed");
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

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl flex justify-center font-bold text-gray-900 mb-2">
                        Welcome Back To
                    </h2>
                    <div className="text-center flex justify-center gap-4 mb-2">
                        <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-900">Mailer</h1>
                    </div>

                    <p className="flex justify-center text-gray-600 mb-6 text-sm">
                        Sign in to your account to continue
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link
                                href="/forgotpassword"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                            text-white font-semibold shadow-lg shadow-blue-500/30
                            hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]
                            active:scale-[0.98] transition-all duration-200 ease-out"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">
                                    New to Mailer?
                                </span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <Link
                            href="/register"
                            className="block w-full py-3.5 rounded-xl border-2 border-blue-600 
                            text-blue-600 font-semibold text-center
                            hover:bg-blue-50 transition-all duration-200"
                        >
                            Create Account
                        </Link>
                    </form>
                </div>

                {/* Footer Text */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}