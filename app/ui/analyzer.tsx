"use client";
import { useState } from "react";

export default function Analyzer(){
  const [resume,setResume]=useState("");
  const [jd,setJd]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState<any>(null);
  const demoResume="环境科学硕士；负责数据整理、实验分析和项目报告撰写；使用 Excel、Python 进行数据处理和可视化；参与环境数据分析项目，建立数据处理流程并完成结果汇报。";
  const demoJD="负责数据分析、业务数据整理、报表制作和结果汇报；本科及以上学历，熟悉 Excel 和 Python；具备数据分析能力、沟通能力和项目经验。";

  async function analyze(){
    if(!resume.trim()||!jd.trim()) return alert("请填写简历和岗位描述。");
    setLoading(true); setResult(null);
    try{
      const r=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({resume,jd})});
      const data=await r.json();
      if(!r.ok) throw new Error(data.error||"分析失败");
      setResult(data);
    }catch(e:any){alert(e.message)}finally{setLoading(false)}
  }

  return <section id="analyzer" className="analyzer container">
    <div className="card">
      <div className="eyebrow">AI JOB MATCH</div><h2>简历 × 岗位智能分析</h2>
      <div className="formgrid">
        <div><label>你的简历</label><textarea value={resume} onChange={e=>setResume(e.target.value)} placeholder="粘贴简历文本……"/></div>
        <div><label>目标岗位 JD</label><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="粘贴招聘描述……"/></div>
      </div>
      <div className="actions">
        <button className="btn light" onClick={()=>{setResume(demoResume);setJd(demoJD)}}>填入示例</button>
        <button className="btn dark" disabled={loading} onClick={analyze}>{loading?"AI 分析中…":"开始 AI 分析"}</button>
      </div>
      {result && <div className="result">
        <div className="score">{result.score}<span style={{fontSize:18}}>/100</span></div>
        <p className="muted">{result.summary}</p>
        <div className="grid2">
          <div className="box"><h3>匹配关键词</h3><div className="chips">{result.matched?.map((x:string)=><span className="chip" key={x}>{x}</span>)}</div></div>
          <div className="box"><h3>建议补充</h3><div className="chips">{result.missing?.map((x:string)=><span className="chip red" key={x}>{x}</span>)}</div></div>
        </div>
        <div className="box"><h3>AI 优化建议</h3><ul>{result.tips?.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul></div>
        {result.rewrites?.length>0 && <div className="box"><h3>可参考的经历改写</h3><ul>{result.rewrites.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul></div>}
      </div>}
    </div>
  </section>
}
