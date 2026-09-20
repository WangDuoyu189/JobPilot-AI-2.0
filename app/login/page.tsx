"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/cloudbase";
import { setSessionCookie } from "./actions";

function normalizePhone(input: string) {
  const value = input.trim().replace(/\s+/g, "");
  if (/^1\d{10}$/.test(value)) return "+86" + value;
  if (/^\+861\d{10}$/.test(value)) return value;
  return "";
}

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationInfo, setVerificationInfo] = useState<any>(null);
  const [countdown, setCountdown] = useState(0);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const normalizedPhone = useMemo(() => {
    const value = phone.trim().replace(/\D/g, "");
    return /^1\d{10}$/.test(value) ? "+86 " + value : "";
  }, [phone]);

  async function sendCode() {
    setMsg("");

    if (!normalizedPhone) {
      setMsg("请输入正确的中国大陆手机号，例如 13800000000。");
      return;
    }

    try {
      const info = await auth.getVerification({
        phone_number: normalizedPhone,
      });

      setVerificationInfo(info);
      setCountdown(60);

      const timer = window.setInterval(() => {
        setCountdown((current) => {
          if (current <= 1) {
            window.clearInterval(timer);
            return 0;
          }
          return current - 1;
        });
      }, 1000);

      setMsg("验证码已发送，请查收短信。");
    } catch (error) {
      console.error("send sms error", error);
      setMsg(error instanceof Error ? error.message : "验证码发送失败，请稍后重试。");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMsg("");

    if (!normalizedPhone) {
      setMsg("请输入正确的中国大陆手机号。");
      return;
    }

    if (!verificationInfo) {
      setMsg("请先点击“获取验证码”。");
      return;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setMsg("请输入 6 位短信验证码。");
      return;
    }

    setSubmitting(true);

    try {
      const loginState: any = await auth.signInWithSms({
        verificationInfo,
        verificationCode: code.trim(),
        phoneNum: normalizedPhone,
      });

      const accessToken = loginState?.accessToken;
      const uid = loginState?.user?.uid ?? loginState?.user?.userId;

      if (!accessToken) {
        throw new Error("验证码正确，但没有建立登录态，请刷新页面后重试。");
      }

      await setSessionCookie(
        accessToken,
        String(uid || "unknown"),
        phone
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("cloudbase login error", error);
      setMsg(error instanceof Error ? error.message : "登录失败，请检查验证码后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <Link href="/" className="brand">
          <span className="brand-mark">J</span>
          <span>JobPilot<span className="brand-accent"> AI</span></span>
        </Link>

        <div className="auth-quote">
          <span>“</span>
          <h1>把求职准备做在<br />面试之前。</h1>
          <p>简历分析、岗位匹配、面试准备，集中在一个清晰的工作台里。</p>
        </div>

        <div className="auth-mini-card">
          <div><b>82%</b><small>平均匹配度</small></div>
          <div><b>18</b><small>本周分析</small></div>
          <div><b>06</b><small>待跟进岗位</small></div>
        </div>
      </div>

      <div className="auth-panel-wrap">
        <form className="auth-panel" onSubmit={submit}>
          <div className="auth-panel-head">
            <span className="eyebrow">PHONE LOGIN</span>
            <h2>欢迎回到 JobPilot</h2>
            <p>使用中国大陆手机号和短信验证码登录，新用户会自动注册。</p>
          </div>

          <label htmlFor="phone">手机号</label>
          <div className="auth-phone-row">
            <span className="auth-phone-prefix">+86</span>
            <input
              id="phone"
              className="auth-input auth-phone-input"
              value={phone}
              onChange={(event) => {
                const raw = event.target.value.replace(/\D/g, "").slice(0, 11);
                setPhone(raw);
              }}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="13800000000"
            />
          </div>

          <label htmlFor="code">短信验证码</label>
          <div className="auth-code-row">
            <input
              id="code"
              className="auth-input"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="6 位验证码"
            />
            <button
              type="button"
              className="btn btn-ghost auth-code-btn"
              disabled={countdown > 0}
              onClick={sendCode}
            >
              {countdown > 0 ? countdown + "s" : "获取验证码"}
            </button>
          </div>

          <button
            className="btn btn-primary auth-submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "正在登录..." : "登录"} <span>→</span>
          </button>

          {msg && <div className="auth-message" role="alert">{msg}</div>}

          <div className="auth-foot">
            登录即表示你同意服务条款与隐私说明。
          </div>
        </form>
      </div>
    </main>
  );
}
