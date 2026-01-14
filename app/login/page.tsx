"use client";

import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const verified = searchParams.get("verified");

    return (
        <div>
            {verified && (
                <p style={{ color: "green" }}>
                    Email verified successfully. Please log in.
                </p>
            )}
            {/* your login form */}
        </div>
    );
}
