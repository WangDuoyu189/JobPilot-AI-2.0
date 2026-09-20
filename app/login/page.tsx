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
    <main className="auth-page">
      <div className="auth-brand">
        <Link href="/" className="brand"><span className="brand-mark">J</span><span>JobPilot<span className="brand-accent"> AI</span></span></Link>
        <div className="auth-quote"><span>“</span><h1>把求职准备做在<br />面试之前。</h1><p>简历分析、岗位匹配、面试准备，集中在一个清晰的工作台里。</p></div>
        <div className="auth-mini-card"><div><b>82%</b><small>平均匹配度</small></div><div><b>18</b><small>本周分析</small></div><div><b>06</b><small>待跟进岗位</small></div></div>
      </div>

      <div className="auth-panel-wrap">
        <div className="auth-panel">
          <div className="auth-panel-head"><span className="eyebrow">WELCOME</span><h2>{signup ? "创建你的求职工作台" : "欢迎回到 JobPilot"}</h2><p>{signup ? "注册后保存你的分析记录和求职进度。" : "登录后继续你的求职分析。"}</p></div>
          <div className="auth-tabs"><button className={!signup ? "active" : ""} onClick={() => {setSignup(false);setMsg("")}}>登录</button><button className={signup ? "active" : ""} onClick={() => {setSignup(true);setMsg("")}}>注册</button></div>

          <label>邮箱</label>
          <input className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
          <label>密码</label>
          <input className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="至少 6 位字符" />

          <button className="btn btn-primary auth-submit" onClick={submit}>{signup ? "创建账号" : "登录"} <span>→</span></button>
          {msg && <div className="auth-message">{msg}</div>}

          <div className="auth-foot">继续即表示你同意服务条款与隐私说明。</div>
        </div>
      </div>
    </main>
  );
}
