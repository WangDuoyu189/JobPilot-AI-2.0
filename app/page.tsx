import Link from "next/link";
import Analyzer from "./ui/analyzer";

export default function Home() {
  return (
    <div className="site-shell">
      <nav className="nav">
        <Link href="/" className="brand">
          <span className="brand-mark">J</span>
          <span>JobPilot<span className="brand-accent"> AI</span></span>
        </Link>

        <div className="navlinks">
          <a href="#features">核心功能</a>
          <a href="#workflow">怎么用</a>
          <a href="#pricing">价格</a>
          <Link className="btn btn-ghost" href="/login">登录</Link>
          <a className="btn btn-primary" href="#analyzer">免费体验</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />

          <div className="hero-copy">
            <div className="kicker"><span className="pulse-dot" />AI 求职工作台 · 2.0</div>
            <h1>把一份普通简历，<br /><span>变成更有竞争力的求职方案。</span></h1>
            <p className="hero-subtitle">
              粘贴你的简历和目标岗位 JD，JobPilot AI 会帮你拆解岗位要求、识别关键词缺口、优化项目表达，
              再给出可执行的求职建议。
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#analyzer">立即分析我的简历 <span>→</span></a>
              <a className="hero-text-link" href="#workflow">看看它怎么工作 <span>↘</span></a>
            </div>
            <div className="trust-row">
              <span>无需安装</span><i>·</i><span>中文岗位场景</span><i>·</i><span>结果可复制</span>
            </div>
          </div>

          <div className="hero-product">
            <div className="product-window">
              <div className="product-topbar">
                <span className="window-dots"><i /><i /><i /></span>
                <span className="window-title">JobPilot 工作台</span>
                <span className="window-status">● 已就绪</span>
              </div>
              <div className="product-body">
                <div className="mock-sidebar">
                  <div className="mock-logo">J</div>
                  <div className="mock-item active"><span>⌂</span>概览</div>
                  <div className="mock-item"><span>✦</span>简历分析</div>
                  <div className="mock-item"><span>◫</span>求职记录</div>
                  <div className="mock-item"><span>◎</span>面试准备</div>
                  <div className="mock-item"><span>⚙</span>设置</div>
                </div>
                <div className="mock-main">
                  <div className="mock-head">
                    <div>
                      <small>本周求职进度</small>
                      <strong>持续推进中</strong>
                    </div>
                    <span className="mock-avatar">王</span>
                  </div>
                  <div className="mock-stats">
                    <div><small>匹配岗位</small><b>18</b><span>↑ 4 本周</span></div>
                    <div><small>平均匹配度</small><b>82<span>%</span></b><span>↑ 8%</span></div>
                    <div><small>待优化简历</small><b>03</b><span>建议处理</span></div>
                  </div>
                  <div className="mock-panel">
                    <div className="mock-panel-head"><b>最近一次分析</b><span>刚刚</span></div>
                    <div className="mock-role"><span className="role-logo">字</span><div><b>数据分析师</b><small>互联网 · 上海 · 15-25K</small></div><strong>89</strong></div>
                    <div className="mock-meter"><span style={{ width: "89%" }} /></div>
                    <div className="mock-tags"><span>Python</span><span>Excel</span><span>数据分析</span><span>项目经验</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-card float-card-score"><span>AI 匹配度</span><b>89</b><small>/ 100</small></div>
            <div className="float-card float-card-tip"><span className="tip-icon">✦</span><div><b>建议已生成</b><small>3 个关键词 · 5 条优化建议</small></div></div>
          </div>
        </section>

        <section className="logo-strip">
          <span>为中文求职场景设计</span>
          <span>简历理解</span>
          <span>JD 拆解</span>
          <span>岗位匹配</span>
          <span>面试准备</span>
          <span>求职记录</span>
        </section>

        <Analyzer />

        <section id="features" className="section section-light">
          <div className="section-heading">
            <span className="section-eyebrow">CORE FEATURES</span>
            <h2>不是“给你一段文字”，<br /><span>而是一套求职决策工具。</span></h2>
            <p>把求职里最费时间、最容易反复修改的工作，集中到一个清晰的工作台里。</p>
          </div>

          <div className="feature-grid">
            <article className="feature-card feature-large">
              <div className="feature-icon blue">✦</div>
              <div><span className="feature-index">01</span><h3>简历 × JD 深度匹配</h3><p>自动拆解岗位要求，识别你的优势、短板和关键词缺口，让你知道“为什么匹配”和“哪里还不够”。</p></div>
              <div className="feature-mini-chart">
                <div className="mini-bars"><i style={{height:"48%"}} /><i style={{height:"70%"}} /><i style={{height:"58%"}} /><i style={{height:"84%"}} /><i style={{height:"92%"}} /></div>
                <div><b>82</b><span>平均匹配度</span></div>
              </div>
            </article>

            <article className="feature-card">
              <div className="feature-icon purple">↗</div>
              <span className="feature-index">02</span>
              <h3>经历表达优化</h3>
              <p>基于真实经历，改写成更贴近岗位语言的项目描述。</p>
              <div className="feature-lines"><span /><span /><span className="short" /></div>
            </article>

            <article className="feature-card">
              <div className="feature-icon orange">◫</div>
              <span className="feature-index">03</span>
              <h3>面试准备</h3>
              <p>从岗位与简历中提炼高频问题和准备方向，减少临时抱佛脚。</p>
              <div className="question-pill">“这个项目你做了什么？”</div>
            </article>

            <article className="feature-card">
              <div className="feature-icon green">◎</div>
              <span className="feature-index">04</span>
              <h3>求职记录</h3>
              <p>集中保存分析记录和岗位状态，知道自己已经投了什么、还缺什么。</p>
              <div className="status-row"><span>已分析 18</span><span>待跟进 06</span></div>
            </article>
          </div>
        </section>

        <section id="workflow" className="section process-section">
          <div className="section-heading">
            <span className="section-eyebrow">HOW IT WORKS</span>
            <h2>3 步完成一次高质量岗位分析</h2>
          </div>
          <div className="process-grid">
            <div className="process-card"><span>01</span><h3>粘贴简历</h3><p>把你的现有简历文本放进来，不需要重新排版。</p></div>
            <div className="process-arrow">→</div>
            <div className="process-card"><span>02</span><h3>输入岗位 JD</h3><p>把目标岗位招聘描述放进来，AI 自动识别岗位重点。</p></div>
            <div className="process-arrow">→</div>
            <div className="process-card"><span>03</span><h3>拿到行动建议</h3><p>查看匹配度、关键词缺口、优化建议和可参考改写。</p></div>
          </div>
        </section>

        <section id="pricing" className="section section-dark">
          <div className="section-heading dark-heading">
            <span className="section-eyebrow">PRICING</span>
            <h2>先免费体验，<br /><span>再决定要不要升级。</span></h2>
            <p>价格只是产品计划的一部分，正式上线时可根据实际成本调整。</p>
          </div>

          <div className="pricing-grid">
            <article className="pricing-card">
              <span className="pricing-label">FREE</span><h3>基础版</h3><div className="price-number">¥0</div><p>适合第一次体验 AI 简历分析。</p>
              <ul><li>每日 1 次基础分析</li><li>岗位匹配度</li><li>关键词缺口</li></ul>
              <a className="btn btn-light-wide" href="#analyzer">立即体验</a>
            </article>
            <article className="pricing-card pricing-featured">
              <div className="popular">最受欢迎</div><span className="pricing-label">PRO</span><h3>求职增强版</h3><div className="price-number">¥29<span>/月</span></div><p>适合持续投递、需要反复优化的人。</p>
              <ul><li>高额度 AI 分析</li><li>简历定制改写</li><li>面试问题生成</li><li>历史记录</li></ul>
              <a className="btn btn-white-wide" href="/login">登录后开通</a>
            </article>
            <article className="pricing-card">
              <span className="pricing-label">CAREER</span><h3>深度求职报告</h3><div className="price-number">¥99<span>/次</span></div><p>一次性准备重点岗位的完整方案。</p>
              <ul><li>完整岗位拆解</li><li>简历重点重构</li><li>面试准备清单</li></ul>
              <a className="btn btn-light-wide" href="/login">查看详情</a>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><div className="brand footer-brand"><span className="brand-mark">J</span><span>JobPilot<span className="brand-accent"> AI</span></span></div><p>让每一次投递，都更有准备。</p></div>
        <div className="footer-links"><a href="#features">核心功能</a><a href="#pricing">价格</a><Link href="/login">登录</Link></div>
        <span>© 2026 JobPilot AI</span>
      </footer>
    </div>
  );
}
