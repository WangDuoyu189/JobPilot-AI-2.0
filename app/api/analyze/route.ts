import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { resume, jd } = await req.json();
    if (!resume || !jd) return NextResponse.json({error:"resume 和 jd 不能为空"}, {status:400});

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        score: 0,
        summary: "尚未配置 OPENAI_API_KEY。部署后填写环境变量即可启用真正的 AI 分析。",
        matched: [], missing: [], tips: ["配置 OPENAI_API_KEY", "重新部署后再次分析"], rewrites: []
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      input: [
        { role: "system", content: `你是一个专业的求职简历分析器。只根据用户提供的简历和JD进行分析，不虚构用户经历。
返回严格 JSON，不要 Markdown：
{
 "score": number,
 "summary": string,
 "matched": string[],
 "missing": string[],
 "tips": string[],
 "rewrites": string[]
}
score 为 0-100 的岗位匹配程度。rewrites 只能基于简历已有事实进行改写，不能编造数字或经历。` },
        { role:"user", content:`简历：\n${resume}\n\n岗位JD：\n${jd}` }
      ]
    });

    let text = response.output_text.replace(/^\`\`\`json\s*/,"").replace(/\`\`\`$/,"").trim();
    return NextResponse.json(JSON.parse(text));
  } catch (e:any) {
    return NextResponse.json({error:"AI 分析失败，请稍后重试。", detail:e?.message}, {status:500});
  }
}
