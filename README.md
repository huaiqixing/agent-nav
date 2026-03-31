# AI Agent 平台导航

AI Agent 开发平台/框架导航网站，支持 Cloudflare Pages 部署。

## 部署到 Cloudflare Pages

### 1. 创建 GitHub 仓库

```bash
cd agent-nav-site
git init
git add .
git commit -m "Initial commit"
gh repo create agent-nav --public --push
```

### 2. 配置 Cloudflare Secrets

在 GitHub 仓库的 `Settings → Secrets and variables → Actions` 中添加：

| Secret 名 | 值来源 |
|-----------|--------|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → 创建令牌 → 使用 "Edit Cloudflare Workers" 模板 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard URL 中找到，格式：`https://dash.cloudflare.com/{account_id}/...` |

### 3. 启用 Cloudflare Pages

1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com/pages)
2. 创建项目 → 连接到 GitHub 仓库
3. 构建配置：
   - **构建命令**：`npx opennextjs-cloudflare build`
   - **输出目录**：`.open-next/worker`

### 4. 自动部署

推送代码后会自动部署。也可以在 GitHub Actions 页面手动触发。

## 本地开发

```bash
cd agent-nav-site
npm install
npm run dev
```

## 技术栈

- Next.js 16
- Tailwind CSS
- @opennextjs/cloudflare
