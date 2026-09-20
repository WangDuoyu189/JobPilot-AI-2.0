import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `你是 JobPilot AI 的中文求职顾问。
只根据用户提供的简历与岗位 JD 进行分析，不虚构学历、公司、项目、数字或成果。
请用简体中文返回严格 JSON，不要 Markdown：
{
  "score": number,
  "summary": string,
  "matched": string[],
  "missing": string[],
  "tips": string[],
  "rewrites": string[]
}
score 为 0-100 的岗位匹配程度。
matched 最多 8 项，missing 最多 8 项，tips 最多 6 项，rewrites 最多 5 项。
rewrites 必须基于原简历事实进行表达优化，不得新增虚构经历。`;

export async function POST(req: Request) {
  try {
    const { resume, jd } = await req.json();

    if (!resume || !jd) {
      return NextResponse.json({ error: "resume 和 jd 不能为空" }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL || "https://api.deepseek.com";
    const model = process.env.AI_MODEL || "deepseek-flash";

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "AI 服务尚未配置，请在生产环境配置 AI_API_KEY、AI_BASE_URL、AI_MODEL。",
        },
        { status: 503 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL,
    });

    const response = await client.responses.create({
      model,
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `【我的简历】\n${resume}\n\n【目标岗位 JD】\n${jd}`,
        },
      ],
    });

    const raw = response.output_text
      .replace(/^\`\`\`json\s*/i, "")
      .replace(/\`\`\`$/i, "")
      .trim();

    const result = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (error) {
    console.error("analyze error", error);
    return NextResponse.json(
      { error: "AI 分析暂时失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
