import Link from "next/link";

export default function Success() {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <span className="section-eyebrow">PAYMENT</span>
        <h1>支付完成</h1>
        <p>你的订单已经完成。接下来可以回到工作台继续使用。</p>
        <Link className="btn btn-primary" href="/dashboard">进入工作台 →</Link>
      </div>
    </main>
  );
}
