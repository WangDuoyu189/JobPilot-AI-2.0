import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import Link from "next/link";

export default async function Dashboard(){
  const supabase=await createServerSupabase();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/login");
  return <><nav className="nav"><div className="brand"><i>✦</i>JobPilot AI</div><Link className="btn light" href="/">返回首页</Link></nav>
    <main className="dashboard">
      <div className="card"><div className="eyebrow">DASHBOARD</div><h1>你好，{user.email}</h1><p className="muted">这里将成为你的求职工作台。</p></div>
      <div className="card"><h2>Pro 订阅</h2><p className="muted">升级后开启无限 AI 分析、简历定制和面试准备。</p>
        <form action="/api/checkout" method="POST"><input type="hidden" name="plan" value="pro"/><button className="btn dark">升级 Pro · ¥29/月</button></form>
      </div>
      <div className="card"><h2>你的数据</h2><p>下一阶段可接入 Supabase 数据表，保存历史分析、收藏岗位和生成的简历版本。</p></div>
    </main>
  </>;
}
