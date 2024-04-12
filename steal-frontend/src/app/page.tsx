'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    // Redirect logic
    router.push('/home');
  }, []);

  return null; // or any loading indicator you want to display while redirecting
}
