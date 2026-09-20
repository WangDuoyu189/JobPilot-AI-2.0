# 腾讯云 CloudBase 国内生产部署

## 运行方式

JobPilot AI 使用 **CloudBase Run（云托管）** 部署 Next.js。

原因：这是完整的 Next.js App Router 应用，包含 SSR、API Routes、登录态和后端 API。CloudBase 官方的 Next.js 指南将此类完整 SSR 应用推荐到 CloudBase Run；CloudBase Run 支持 SSR、流式响应、Server Actions 和自定义域名。

## GitHub Actions

仓库已配置：

`.github/workflows/deploy-cloudbase.yml`

需要的 GitHub Actions Secrets：

- TCB_SECRET_ID
- TCB_SECRET_KEY
- TCB_ENV_ID

其中：

`TCB_ENV_ID=jobpilot-prod-d5gawdy5ife107d47`

## CloudBase Run 服务

- 环境：`jobpilot-prod-d5gawdy5ife107d47`
- 服务名：`jobpilot-ai`
- 容器端口：`3000`

Dockerfile 使用 Next.js standalone：

1. Node 22 安装依赖
2. `npm run build`
3. 从 `.next/standalone` 复制运行产物
4. 复制 `.next/static` 和 `public`
5. `node server.js` 监听 3000

## 手动部署

安装并登录 CloudBase CLI：

```bash
npm install -g @cloudbase/cli
tcb login
```

部署：

```bash
tcb cloudrun deploy -e jobpilot-prod-d5gawdy5ife107d47 -s jobpilot-ai --port 3000 --force --yes --wait
```

## 服务配置

CloudBase Run 控制台：

云托管 → 服务 → `jobpilot-ai` → 服务配置

设置：

```text
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
AI_API_KEY=你的国内模型 Key
AI_BASE_URL=你的模型兼容接口地址
AI_MODEL=你的模型名
CLOUDBASE_ENV_ID=jobpilot-prod-d5gawdy5ife107d47
```

不要把 API Key 写入 GitHub 仓库。

## 公网

开启公网访问。CloudBase Run 会提供 HTTPS 默认域名。

后续再绑定正式域名、SSL 和 ICP 备案域名。

## 下一阶段

CloudBase Run 部署完成后：

1. CloudBase Auth
2. CloudBase MySQL
3. 国内 AI
4. 微信支付 / 支付宝
5. 自定义域名 + ICP
6. 额度系统和生产安全
