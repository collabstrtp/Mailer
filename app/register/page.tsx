"use client";

import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        emailAppPassword: "",
    });

    const router = useRouter();
    const { name, email, password, emailAppPassword } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/register", formData);
            toast.success(
                response.data.message ||
                "Registration successful. Please verify your email."
            );

            setTimeout(() => {
                router.push("/login");
            }, 2500);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Registration failed");
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


                {/* Register Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl flex justify-center font-bold text-gray-900 mb-2">
                        Create Your Account
                    </h2><div className="text-center flex justify-center  gap-4 mb-2">
                        <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>

                        <h1 className="text-3xl font-bold text-gray-900">Mailer</h1>
                    </div>

                    <p className="flex justify-center text-gray-600 mb-6 text-sm">
                        Start automating your emails with AI
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                        </div>

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

                        {/* Email App Password Input */}
                        <div>
                            <label htmlFor="emailAppPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Email App Password
                            </label>
                            <input
                                id="emailAppPassword"
                                name="emailAppPassword"
                                type="password"
                                value={emailAppPassword}
                                onChange={handleChange}
                                placeholder="••••••••••••••••"
                                required
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 
                                border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white
                                outline-none transition-all duration-200"
                            />
                            <p className="mt-1.5 text-xs text-gray-500">
                                Required for sending emails from your account
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                            text-white font-semibold shadow-lg shadow-blue-500/30
                            hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]
                            active:scale-[0.98] transition-all duration-200 ease-out mt-6"
                        >
                            Create Account
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <Link
                            href="/login"
                            className="block w-full py-3.5 rounded-xl border-2 border-blue-600 
                            text-blue-600 font-semibold text-center
                            hover:bg-blue-50 transition-all duration-200"
                        >
                            Sign In
                        </Link>
                    </form>
                </div>

                {/* Footer Text */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    By creating an account, you agree to our{" "}
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