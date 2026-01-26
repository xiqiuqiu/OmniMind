<h1 align="center">🧠 OmniMind</h1>

<p align="center">
  <strong>用 AI 将想法变成可视化知识图谱</strong><br>
  <em>本地优先 · 隐私安全 · 无限探索</em>
</p>

<p align="center">
  <a href="https://github.com/vuejs/core"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue"></a>
  <a href="https://github.com/vitejs/vite"><img src="https://img.shields.io/badge/vite-5.x-646cff.svg" alt="vite"></a>
  <a href="https://github.com/microsoft/TypeScript"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"></a>
  <a href="https://github.com/tailwindlabs/tailwindcss"><img src="https://img.shields.io/badge/tailwind-3.x-38bdf8.svg" alt="tailwind"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="license"></a>
</p>

<p align="center">
  <a href="./README.en.md">English</a> | 中文
</p>

---

## 🎯 这是什么？

**OmniMind** 是一个 AI 驱动的思维导图工具，帮你把模糊的想法变成清晰的知识结构。

只需输入一个核心概念，AI 会自动帮你：
- 🌳 **展开思维树** - 从一个想法生成完整的知识框架
- 💬 **对话式探索** - 像聊天一样深入任何感兴趣的分支
- 📝 **深度解析** - 为任何节点生成 300-500 字的专业分析
- 🎨 **可视化配图** - 用 AI 生成图片帮助理解抽象概念
- 📊 **全局总结** - 自动提取整个思维图谱的核心要点

**本地优先设计** - 所有数据存储在你的浏览器中，支持任何 OpenAI 兼容的 API，无需担心隐私泄露。

---

## ✨ 核心功能

### 🚀 智能思维扩展

**告别"白纸焦虑"** - 不知道从哪开始？输入一个想法，AI 自动帮你构建初始框架。

- **上下文感知追问** - AI 理解从根节点到当前节点的完整路径，每次回答都基于完整的上下文
- **两种思考模式** - 切换"发散模式"（创意优先）和"严谨模式"（逻辑优先）
- **智能布局** - 自动排列节点，避免重叠，保持图谱清晰

### 🔍 深度内容挖掘

**不止于大纲** - 每个节点都可以深入探索：

- **深度回答** - 一键生成详细解析，支持 Markdown 格式
- **AI 配图** - 为抽象概念生成视觉化图片
- **图谱对话** - 基于整个知识图谱与 AI 对话提问
- **全局总结** - 自动分析整个思维图谱，提取关键洞察

### 🎨 强大的交互体验

**像操作思维一样自然** - 流畅的交互让你专注于思考：

- **演示模式** - 全屏展示，用键盘（←/→）在节点间导航
- **实时搜索** - 快速定位任何节点
- **层级拖拽** - 拖动父节点时子节点自动跟随
- **子树折叠** - 管理大型图谱，在宏观和细节间自由切换
- **对齐辅助线** - 拖动节点时显示智能对齐参考线
- **便签功能** - 在画布上添加自由便签记录灵感
- **导出 Markdown** - 将整个思维图谱导出为结构化文档

### 🔐 隐私与灵活性

- **本地优先** - 数据存储在浏览器 localStorage，完全掌控你的数据
- **云端同步**（可选）- 支持 Supabase 云存储，多设备同步
- **多项目管理** - 创建和切换多个独立的思维图谱项目
- **API 自由** - 支持任何 OpenAI 兼容的 API（OpenAI、智谱、通义千问等）
- **中英双语** - 完整的界面本地化支持

---

## 🎬 快速开始

### 在线体验

立即访问：[omnimind.sigclr.com](https://omnimind.sigclr.com/)

### 本地运行

```bash
# 1. 克隆项目
git clone https://github.com/xiqiuqiu/ThinkFlowAI.git
cd ThinkFlowAI

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 即可使用。

---

## ⚙️ 配置你的 API

项目默认使用 **OpenRouter** 服务（支持多种 AI 模型的统一接口）。

### 方式一：使用 OpenRouter（推荐）

1. 访问 [OpenRouter](https://openrouter.ai/) 注册并获取 API Key
2. 点击右上角的 ⚙️ 设置按钮
3. 选择"自定义配置"，填入：
   - **对话 API**：
     - Base URL: `https://openrouter.ai/api/v1/chat/completions`
     - Model: `google/gemini-2.5-flash`（或其他支持的模型）
     - API Key: 你的 OpenRouter Key
   - **图片 API**：
     - Base URL: `https://openrouter.ai/api/v1/chat/completions`
     - Model: `bytedance-seed/seedream-4.5`（或其他支持的图片模型）
     - API Key: 你的 OpenRouter Key

### 方式二：使用环境变量

创建 `.env` 文件：

```bash
VITE_CHAT_BASE_URL=https://openrouter.ai/api/v1/chat/completions
VITE_CHAT_MODEL=google/gemini-2.5-flash
VITE_CHAT_API_KEY=your-openrouter-key

VITE_IMAGE_BASE_URL=https://openrouter.ai/api/v1/chat/completions
VITE_IMAGE_MODEL=bytedance-seed/seedream-4.5
VITE_IMAGE_API_KEY=your-openrouter-key
```

### 兼容性说明

- **对话 API**：完全兼容 OpenAI Chat Completions 格式，可以使用任何兼容的服务（OpenAI、智谱、通义千问等）
- **图片 API**：目前使用 OpenRouter 的图片生成格式，如需使用 OpenAI DALL-E 或其他服务，需要修改 `src/composables/useThinkFlow.ts` 中的响应解析代码

---

## 🎯 使用场景

- **学习新知识** - 输入一个主题，AI 帮你构建完整的知识框架
- **头脑风暴** - 从一个想法出发，探索各种可能性
- **写作大纲** - 快速生成文章或报告的结构
- **项目规划** - 分解复杂项目为可执行的子任务
- **知识整理** - 将碎片化的信息组织成结构化的知识图谱
- **演讲准备** - 用演示模式展示你的思维过程

---

## 🛠️ 技术栈

- **Vue 3** - 现代化的响应式框架
- **TypeScript** - 类型安全
- **Vite** - 极速开发体验
- **VueFlow** - 强大的流程图引擎
- **Tailwind CSS** - 优雅的界面设计
- **Supabase**（可选）- 云端数据同步

---

## 📦 部署

### 部署到 Cloudflare Pages（推荐）

项目已配置好 Cloudflare Pages 部署：

```bash
# 一键构建并部署
npm run deploy
```

首次部署需要先登录 Cloudflare：
```bash
npx wrangler login
```

### 部署到其他平台

项目是标准的 Vite 应用，也可以部署到其他静态托管服务：

```bash
# 构建生产版本
npm run build
```

生成的 `dist/` 目录可以部署到：
- **Vercel** - 导入 GitHub 仓库，自动识别 Vite 项目
- **Netlify** - 拖拽 `dist` 文件夹或连接 Git 仓库
- **GitHub Pages** - 使用 GitHub Actions 自动部署
- 任何支持静态文件的服务器

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 开源协议

MIT License - 自由使用、修改和分发

---

## ❤️ 致谢

本项目基于 [ThinkFlowAI](https://github.com/ThinkFlowAI/ThinkFlowAI) 开发。

感谢原作者 [lz-t](https://github.com/lz-t) 及 [ThinkFlowAI 团队](https://github.com/ThinkFlowAI) 的开源贡献。

---

<p align="center">
  如果这个项目对你有帮助，请给一个 ⭐️ 支持一下！
</p>
