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

    // ✅ show success toast after email verification
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
            router.push("/sendmail");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-[#080509] via-[#1a171c] to-[#080509] rounded-[40px] p-9 border-[5px] border-white shadow-2xl">

                    <h2 className="text-center text-[30px] font-black text-[#1089d3] mb-8">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full px-5 py-4 rounded-[20px] bg-white text-gray-800 placeholder-gray-400 
                         border-2 border-transparent focus:border-[#12b1d1] focus:outline-none
                         shadow-[0_10px_10px_-5px_#cff0ff] transition-all duration-200"
                        />

                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-5 py-4 rounded-[20px] bg-white text-gray-800 placeholder-gray-400 
                         border-2 border-transparent focus:border-[#12b1d1] focus:outline-none
                         shadow-[0_10px_10px_-5px_#cff0ff] transition-all duration-200"
                        />

                        <div className="text-center pt-2">
                            <Link
                                href="/forgetpassword"
                                className="text-[#0099ff] hover:text-[#12b1d1] transition-colors duration-200"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-[20px] bg-gradient-to-r from-[#1089d3] to-[#12b1d1] 
                       text-white font-bold shadow-[0_20px_10px_-15px_rgba(133,189,215,0.878)]
                       hover:shadow-[0_25px_15px_-15px_rgba(133,189,215,0.878)] 
                       hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-200 ease-in-out"
                        >
                            Login
                        </button>

                        <div className="text-center text-gray-300">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-[#0099ff] hover:text-[#12b1d1] transition-colors duration-200 font-medium"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
