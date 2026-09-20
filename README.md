# JobPilot AI 2.0

面向中文求职场景的 AI 求职 SaaS。

## 当前产品方向

这个版本先把产品体验和 UI 做成完整 SaaS，而不是简单的“文字堆积页”。

首页包含：
- Hero 产品展示区
- 简历 × JD 智能分析工作台
- 匹配度与关键词结果
- 功能展示
- 3 步工作流
- 定价区
- 登录页
- 用户 Dashboard

## 国内生产架构

最终面向中国大陆用户时，不再以 Vercel / Supabase / Stripe / OpenAI 作为生产主链路。

推荐架构：

- 前端与 SSR/API：腾讯云 CloudBase
- 用户认证：CloudBase 身份认证
- 数据库：CloudBase MySQL
- AI：DeepSeek / 阿里云百炼 / 腾讯混元，可通过环境变量切换
- 国内支付：微信支付 / 支付宝
- 域名：国内服务商 + ICP 备案

腾讯云 CloudBase 官方文档目前支持 Next.js SSR 与 API Routes 的部署，并提供身份认证、数据库、云函数、云托管等能力。

## AI Provider

后端通过 OpenAI 兼容 SDK 调用模型，但“OpenAI”这里只是客户端 SDK，不代表生产模型必须使用 OpenAI。

当前默认示例：

- AI_BASE_URL=https://api.deepseek.com
- AI_MODEL=deepseek-flash

可切换到其他兼容 OpenAI API 的国内模型服务，只需修改：
- AI_API_KEY
- AI_BASE_URL
- AI_MODEL

## 本地启动

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel

当前 Vercel 地址只作为开发/预览环境：

https://job-pilot-ai-2-0.vercel.app

正式面向中国大陆用户时，迁移到腾讯云 CloudBase。

## CloudBase 生产部署

腾讯云 CloudBase 官方支持：
- Next.js SSR
- API Routes
- 身份认证
- MySQL / 文档型数据库
- 云函数 / 云托管
- 自定义域名

中国大陆正式生产域名需要按照要求完成 ICP 备案。

## 当前状态

- GitHub：已连接
- Vercel：已部署成功，可作为预览
- UI：已重做
- AI 接口：已改成国内模型服务抽象
- Supabase：之前的测试环境可保留，但不作为最终国内生产方案
- Stripe：不作为最终国内支付方案

## 下一阶段

1. CloudBase 环境
2. CloudBase Auth
3. CloudBase MySQL
4. 国内 AI 正式接入
5. 微信支付 / 支付宝
6. 自定义域名 + ICP 备案
7. SEO、数据统计、额度系统
8. 正式上线
