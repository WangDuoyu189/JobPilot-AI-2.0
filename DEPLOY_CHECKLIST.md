# 上线清单

## 1. GitHub
- 新建一个 private/public repository
- 上传本项目全部文件
- 不要上传 `.env.local`

## 2. Supabase
- 新建项目
- 执行 `supabase/schema.sql`
- 配置 Auth → URL Configuration
- Site URL 填你的 Vercel 域名

## 3. OpenAI
- 创建 API Key
- 只放在 Vercel Server Environment Variables
- 不要写进前端代码

## 4. Stripe
- 创建 JobPilot Pro 月付 Price
- 复制 Price ID
- 配置 webhook
- 测试支付成功/取消订阅/支付失败

## 5. Vercel
- Import Git Repository
- 添加所有环境变量
- Deploy

## 6. 域名
- 绑定自己的域名
- 更新 NEXT_PUBLIC_SITE_URL
- 更新 Supabase Site URL 和 Redirect URLs
- 更新 Stripe webhook endpoint

## 7. 上线前
- 测试注册
- 测试登录
- 测试 AI 分析
- 测试支付
- 测试 webhook
- 测试手机端
- 设置隐私政策和服务条款
