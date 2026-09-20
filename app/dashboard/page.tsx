import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-side">
        <Link href="/" className="brand side-brand"><span className="brand-mark">J</span><span>JobPilot<span className="brand-accent"> AI</span></span></Link>
        <div className="side-section-label">工作台</div>
        <a className="side-link active" href="#"><span>⌂</span>概览</a>
        <a className="side-link" href="/#analyzer"><span>✦</span>新建分析</a>
        <a className="side-link" href="#"><span>◫</span>分析记录</a>
        <a className="side-link" href="#"><span>◎</span>面试准备</a>
        <div className="side-section-label">账号</div>
        <a className="side-link" href="#"><span>⚙</span>设置</a>
        <div className="side-bottom"><div className="side-avatar">{(user.email ?? "U").slice(0,1).toUpperCase()}</div><div><b>{user.email}</b><small>Free 计划</small></div></div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-top">
          <div><span className="section-eyebrow">OVERVIEW</span><h1>你的求职工作台</h1><p>今天也把简历准备得更有针对性。</p></div>
          <a className="btn btn-primary" href="/#analyzer">＋ 新建分析</a>
        </div>

        <div className="dash-stat-grid">
          <div className="dash-stat"><span className="stat-icon blue">✦</span><small>本周匹配岗位</small><b>18</b><em>+4 较上周</em></div>
          <div className="dash-stat"><span className="stat-icon purple">↗</span><small>平均匹配度</small><b>82<span>%</span></b><em>+8% 较上周</em></div>
          <div className="dash-stat"><span className="stat-icon orange">◫</span><small>待优化简历</small><b>03</b><em>建议尽快处理</em></div>
          <div className="dash-stat"><span className="stat-icon green">◎</span><small>面试准备度</small><b>76<span>%</span></b><em>继续补充案例</em></div>
        </div>

        <div className="dash-grid">
          <section className="dash-card recent-card">
            <div className="dash-card-head"><div><b>最近分析</b><small>按时间倒序</small></div><a href="#">查看全部 →</a></div>
            <div className="analysis-table">
              <div className="table-row table-head"><span>岗位</span><span>公司</span><span>匹配度</span><span>状态</span></div>
              <div className="table-row"><span><b>数据分析师</b><small>上海 · 15-25K</small></span><span>字节系 · 互联网</span><strong className="score-pill good">89</strong><span className="status-chip done">已完成</span></div>
              <div className="table-row"><span><b>商业分析</b><small>杭州 · 18-30K</small></span><span>消费科技</span><strong className="score-pill good">84</strong><span className="status-chip done">已完成</span></div>
              <div className="table-row"><span><b>产品运营</b><small>深圳 · 12-18K</small></span><span>ToC 产品</span><strong className="score-pill mid">76</strong><span className="status-chip doing">待优化</span></div>
              <div className="table-row"><span><b>市场分析</b><small>北京 · 15-22K</small></span><span>企业服务</span><strong className="score-pill mid">71</strong><span className="status-chip doing">待跟进</span></div>
            </div>
          </section>

          <section className="dash-card progress-card">
            <div className="dash-card-head"><div><b>求职进度</b><small>过去 30 天</small></div></div>
            <div className="progress-ring"><div><b>68</b><span>完成度</span></div></div>
            <div className="progress-list"><span><i className="p-dot blue" />岗位筛选 <b>18</b></span><span><i className="p-dot purple" />简历优化 <b>11</b></span><span><i className="p-dot orange" />投递跟进 <b>07</b></span><span><i className="p-dot green" />面试准备 <b>04</b></span></div>
          </section>
        </div>

        <section className="dash-card quick-card">
          <div><span className="section-eyebrow">NEXT STEP</span><h2>下一步建议</h2><p>你最近分析的岗位中，有 3 个岗位匹配度超过 80%，可以优先准备对应的定制简历。</p></div>
          <a className="btn btn-primary" href="/#analyzer">继续优化 →</a>
        </section>
      </main>
    </div>
  );
}
