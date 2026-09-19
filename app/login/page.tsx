"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit() {
    const supabase = createBrowserSupabase();
    const res = signup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      setMsg(res.error.message);
      return;
    }

    if (signup) {
      setMsg("注册成功，请检查邮箱完成验证。");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="auth">
      <div className="card">
        <Link href="/">
          <b>← JobPilot AI</b>
        </Link>
        <h2>{signup ? "创建账号" : "登录 JobPilot AI"}</h2>
        <p className="muted">保存你的分析记录，并解锁付费功能。</p>

        <label>邮箱</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <label>密码</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <button className="btn dark" style={{ width: "100%" }} onClick={submit}>
          {signup ? "注册" : "登录"}
        </button>

        {msg && <p className="notice">{msg}</p>}

        <button
          className="btn light"
          style={{ width: "100%", marginTop: 10 }}
          onClick={() => setSignup(!signup)}
        >
          {signup ? "已有账号？登录" : "没有账号？注册"}
        </button>
      </div>
    </main>
  );
}
