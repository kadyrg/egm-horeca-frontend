"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function ExpiredVerificationUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError(true);
      setLoading(false);
    }
    async function verify() {
      const res = await fetch(`/api/verify-email?token=${token}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        router.push("/");
        toast(`Verification success`);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    verify();
  }, [token, router]);

  if (loading) return null;
  if (error) return <p className="text-red-600">Token expired</p>;
}

export { ExpiredVerificationUrl };
