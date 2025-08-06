"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

function MobileHidden({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return null;
  if (isMobile) return null;
  return <>{children}</>;
};

function MobileVisible({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return null;
  if (!isMobile) return null;
  return <>{children}</>;
};

export { MobileHidden, MobileVisible }
