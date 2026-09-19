import Link from "next/link";
import Analyzer from "./ui/analyzer";

export default function Home() {
  return <>
    <nav className="nav">
      <div className="brand"><i>✦</i>JobPilot AI</div>
      <div className="navlinks">
        <a href="#features">功能</a><a href="#pricing">价格</a>
        <Link className="btn dark" href="/login">登录 / 注册</Link>
      </div>
    </nav>
    <section className="hero">
      <div className="kicker">AI 求职效率工具 · 2.0</div>
      <h1>让你的简历<br/><span>更接近面试</span></h1>
      <p>输入简历和目标岗位，AI 帮你分析匹配度、找出关键词缺口，并生成更贴近岗位的表达。</p>
      <a className="btn dark" href="#analyzer">免费开始分析 →</a>
    </section>
    <Analyzer />
    <section id="features" className="section">
      <h2>一个工具，覆盖求职关键环节</h2>
      <div className="features">
        <div className="feature"><b>01</b><h3>AI 简历分析</h3><p>识别岗位核心要求，告诉你哪些经历值得强调。</p></div>
        <div className="feature"><b>02</b><h3>岗位定制改写</h3><p>根据真实经历生成更贴近 JD 的 bullet points。</p></div>
        <div className="feature"><b>03</b><h3>面试准备</h3><p>根据岗位和简历生成高频问题与准备方向。</p></div>
      </div>
    </section>
    <section id="pricing" className="section">
      <h2>简单透明的价格</h2>
      <div className="prices">
        <div className="price"><h3>Free</h3><div className="amount">¥0</div><p>每天 1 次基础分析</p><p>匹配度 + 关键词</p><button className="btn light">免费使用</button></div>
        <div className="price featured"><h3>Pro</h3><div className="amount">¥29/月</div><p>AI 深度分析</p><p>简历定制改写</p><p>面试题生成</p><Link className="btn dark" href="/dashboard?upgrade=1">升级 Pro</Link></div>
        <div className="price"><h3>Career</h3><div className="amount">¥99/次</div><p>深度求职报告</p><p>岗位策略 + 面试清单</p><Link className="btn light" href="/dashboard?career=1">购买报告</Link></div>
      </div>
    </section>
    <footer>© 2026 JobPilot AI · AI 求职效率工具</footer>
  </>;
}
