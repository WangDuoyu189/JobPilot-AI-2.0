# JobPilot AI 2.0

一个可以部署成真实 SaaS 的 AI 求职产品。

## 技术栈

- Next.js App Router
- TypeScript
- OpenAI Responses API
- Supabase Auth + Postgres
- Stripe Checkout
- Vercel 部署

OpenAI 官方 JS SDK 当前支持 `responses.create()`；本项目把 API Key 放在服务端环境变量中，不暴露给浏览器。
Supabase 官方 Next.js SSR 方案使用 `@supabase/ssr` 和 Cookie 会话。
Stripe Checkout 支持 subscription 模式，并在服务端创建 Checkout Session。

## 本地启动

```bash
npm install
cp .env.example .env.local
npm run dev
```

然后打开 http://localhost:3000

## 配置 Supabase

1. 创建 Supabase 项目。
2. 在 SQL Editor 执行 `supabase/schema.sql`。
3. 在 Project Connect 中取得：
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
4. 填入 `.env.local`。

## 配置 OpenAI

设置：
OPENAI_API_KEY=你的服务端 API Key
OPENAI_MODEL=gpt-5

## 配置 Stripe

1. 创建一个订阅产品，例如 JobPilot Pro。
2. 创建月度 Price。
3. 设置 STRIPE_PRO_PRICE_ID。
4. 设置 STRIPE_SECRET_KEY。
5. 设置 STRIPE_WEBHOOK_SECRET。
6. Stripe webhook 指向：
   https://你的域名/api/webhook

生产环境建议监听：
- checkout.session.completed
- customer.subscription.deleted
- customer.subscription.updated
- invoice.paid
- invoice.payment_failed

然后在 webhook 中同步 Supabase 的 profiles.plan。

## 部署 Vercel

把项目上传 GitHub，在 Vercel 导入。

在 Vercel Project Settings → Environment Variables 中添加 .env.local 的变量。

部署后修改：
NEXT_PUBLIC_SITE_URL=https://你的真实域名

## 现在已经实现

- 营销首页
- 免费分析 UI
- OpenAI AI 分析 API
- Supabase 邮箱登录/注册
- 用户工作台
- Stripe Pro 订阅 Checkout
- Stripe webhook 骨架
- Supabase 数据库 schema
- 移动端适配

## 下一步商业化

建议按顺序做：

1. 接真实 Stripe 收款
2. 给 Free 用户做每日额度
3. Pro 用户无限/高额度
4. 保存分析历史
5. AI 一键重写简历
6. AI 生成求职信
7. AI 模拟面试
8. SEO 岗位页面
9. Referral 邀请奖励
10. 企业版招聘工具

收入不能保证；上线后需要通过真实用户、转化率和获客成本验证商业模式。
