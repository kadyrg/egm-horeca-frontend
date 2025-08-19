"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "invalid"
  >("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    async function verifyEmail() {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json();
          setErrorMsg(data.error || "Verification failed");
          setStatus("error");
          return;
        }

        setStatus("success");

        router.replace("/");
      } catch (error) {
        setErrorMsg("Network or server error");
        setStatus("error");
      }
    }

    verifyEmail();
  }, [token, router]);

  if (status === "loading") {
    return <p>Verifying your email, please wait...</p>;
  }

  if (status === "invalid") {
    return <p>Invalid verification link.</p>;
  }

  if (status === "error") {
    return (
      <>
        <p>Verification failed: {errorMsg}</p>
        <p>Please try again or contact support.</p>
      </>
    );
  }

  return null; // This will briefly show nothing before redirect
}
