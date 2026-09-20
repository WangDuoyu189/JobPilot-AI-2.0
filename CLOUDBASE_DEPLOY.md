# 腾讯云 CloudBase 部署

## 当前部署路线

JobPilot AI 的正式国内生产环境目标：

- 腾讯云 CloudBase：Next.js SSR + API
- 国内 AI 模型服务：DeepSeek / 阿里云百炼 / 腾讯混元
- CloudBase Auth：后续替换当前 Supabase Auth
- CloudBase MySQL：后续替换当前 Supabase Database
- 微信支付 / 支付宝：后续替换当前 Stripe

## 为什么先做 CloudBase Web 部署

当前项目已经能在 Vercel 构建成功。CloudBase 官方目前支持 Next.js HTTP 云函数，并支持 SSR 和 API Routes。Next.js 项目需要 `output: "standalone"` 才适合这种部署方式。

## 本项目已经准备好

- `next.config.mjs`：standalone、图片优化关闭
- `.github/workflows/deploy-cloudbase.yml`：main 分支自动部署
- `public/.gitkeep`：保证 standalone 资源复制步骤有目标目录
- Node.js：20.9+

## 腾讯云控制台准备

1. 登录腾讯云。
2. 开通 CloudBase。
3. 创建一个生产环境，例如 `jobpilot-prod`。
4. 记录环境 ID（Env ID）。
5. 创建腾讯云 API 密钥，至少保证该账号有 CloudBase 部署权限。

## GitHub Secrets

在 GitHub 仓库：

Settings → Secrets and variables → Actions → New repository secret

添加：

`TCB_SECRET_ID`
`TCB_SECRET_KEY`
`TCB_ENV_ID`

不要把 SecretId / SecretKey 写入代码。

## 自动部署

以后推送到 `main`：

GitHub Actions → Deploy JobPilot AI to Tencent CloudBase

会自动：

1. 安装依赖
2. 构建 Next.js
3. 整理 `.next/standalone`
4. 登录 CloudBase
5. 部署 HTTP 云函数

CloudBase 官方 CLI V3 当前命令为 `tcb fn deploy`。

## 访问地址

CloudBase HTTP 云函数部署成功后，会获得默认 HTTP 访问入口。
后续再配置：

- HTTP 访问服务
- 自定义域名
- HTTPS
- 中国大陆生产域名备案

## 注意

当前迁移的是“网站运行层”。

Supabase Auth/Database 仍是旧测试环境，下一阶段必须迁移到 CloudBase Auth + MySQL，才能实现完整的国内生产架构。
