"use client";

import { useState } from "react";

type AnalysisResult = {
  score: number;
  summary: string;
  matched?: string[];
  missing?: string[];
  tips?: string[];
  rewrites?: string[];
};

export default function Analyzer() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const demoResume =
    "环境科学硕士；负责数据整理、实验分析和项目报告撰写；使用 Excel、Python 进行数据处理和可视化；参与环境数据分析项目，建立数据处理流程并完成结果汇报。";
  const demoJD =
    "负责数据分析、业务数据整理、报表制作和结果汇报；本科及以上学历，熟悉 Excel 和 Python；具备数据分析能力、沟通能力和项目经验。";

  async function analyze() {
    if (!resume.trim() || !jd.trim()) {
      alert("请先填写简历和目标岗位 JD。");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jd }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "分析失败");
      setResult(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : "分析失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  const score = Math.max(0, Math.min(100, Number(result?.score ?? 0)));

  return (
    <section id="analyzer" className="analyzer-wrap">
      <div className="analyzer-shell">
        <div className="analyzer-head">
          <div>
            <span className="section-eyebrow">AI MATCH ENGINE</span>
            <h2>把岗位 JD 变成一张“求职路线图”</h2>
            <p>输入两份文本，拿到匹配度、关键词差距、优化建议和经历改写方向。</p>
          </div>
          <span className="live-pill"><i /> AI 引擎就绪</span>
        </div>

        <div className="analyzer-grid">
          <div className="input-card">
            <div className="input-card-head"><div><span className="input-index">01</span><b>我的简历</b></div><span>文本输入</span></div>
            <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="粘贴你的简历、项目经历或工作经历……" />
            <div className="input-meta"><span>{resume.length} 字</span><button onClick={() => setResume(demoResume)}>填入示例</button></div>
          </div>

          <div className="input-card">
            <div className="input-card-head"><div><span className="input-index">02</span><b>目标岗位 JD</b></div><span>文本输入</span></div>
            <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="粘贴招聘岗位描述、任职要求……" />
            <div className="input-meta"><span>{jd.length} 字</span><button onClick={() => setJd(demoJD)}>填入示例</button></div>
          </div>
        </div>

        <div className="analyzer-action-row">
          <div className="privacy-note"><span>◉</span> 仅用于本次分析 · 不建议粘贴身份证、银行卡等敏感信息</div>
          <button className="btn btn-primary btn-lg" disabled={loading} onClick={analyze}>{loading ? "正在分析…" : "开始 AI 分析"} <span>↗</span></button>
        </div>

        {result && (
          <div className="analysis-result">
            <div className="result-summary">
              <div className="score-ring" style={{ ["--score" as string]: score }}>
                <div><b>{score}</b><span>/100</span></div>
              </div>
              <div><span className="result-label">MATCH SCORE</span><h3>岗位匹配度</h3><p>{result.summary}</p></div>
            </div>

            <div className="result-columns">
              <div className="result-box"><div className="result-box-title"><span className="result-dot good" />匹配关键词 <b>{result.matched?.length ?? 0}</b></div><div className="tag-cloud">{(result.matched ?? []).map((item) => <span key={item} className="result-tag good-tag">{item}</span>)}</div></div>
              <div className="result-box"><div className="result-box-title"><span className="result-dot warn" />建议补充 <b>{result.missing?.length ?? 0}</b></div><div className="tag-cloud">{(result.missing ?? []).map((item) => <span key={item} className="result-tag warn-tag">{item}</span>)}</div></div>
            </div>

            <div className="result-box">
              <div className="result-box-title"><span className="result-dot purple-dot" />AI 优化建议</div>
              <div className="tip-list">{(result.tips ?? []).map((item, index) => <div key={item} className="tip-row"><b>{String(index + 1).padStart(2, "0")}</b><span>{item}</span></div>)}</div>
            </div>

            {(result.rewrites ?? []).length > 0 && (
              <div className="result-box">
                <div className="result-box-title"><span className="result-dot purple-dot" />可参考的经历改写</div>
                <div className="rewrite-list">{result.rewrites?.map((item) => <div key={item} className="rewrite-row"><span>✦</span><p>{item}</p></div>)}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
