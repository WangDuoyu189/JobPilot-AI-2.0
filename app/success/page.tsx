import Link from "next/link";
export default function Success(){return <main className="auth"><div className="card" style={{textAlign:"center"}}><div style={{fontSize:50}}>✓</div><h1>支付成功</h1><p className="muted">你的订单已完成。接下来可以返回工作台。</p><Link className="btn dark" href="/dashboard">进入工作台</Link></div></main>}
