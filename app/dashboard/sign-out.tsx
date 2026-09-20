"use client";

import { useRouter } from "next/navigation";
import { getAuth } from "@/lib/cloudbase";
import { clearSessionCookie } from "@/app/login/actions";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await getAuth().signOut();
    } finally {
      await clearSessionCookie();
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button type="button" className="side-link" onClick={handleSignOut}>
      <span>↪</span>
      退出登录
    </button>
  );
}
