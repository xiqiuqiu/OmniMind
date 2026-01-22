# ThinkFlow AI

[English](./README.md) | 中文

ThinkFlow AI 是一个轻量级、Local-first（本地优先）的 AI 驱动思维导图工作台。它能够将你的一个简单想法，通过 AI 的发散性思维，自动化地扩展为结构清晰、可视化程度高的思维图谱。

本项目旨在提供一个极致流畅、无需复杂后端配置、且具备深度解析能力的思维助手，帮助用户在头脑风暴、知识梳理和创意发散时获得持续的灵感支持。

---

## 🌟 核心亮点

- **🚀 从想法到图谱**：只需输入一个核心概念，AI 会自动生成根节点并向外发散多个具有深度的子节点。
- **🧠 上下文关联追问**：支持针对任意节点进行追问，AI 在生成时会参考“从根到当前节点”的思考路径，确保生成的逻辑一致性。
- **📖 深度回答（Deep Dive）**：不再仅仅是关键词，点击“回答”即可让 AI 针对该节点生成详尽的解析、背景及应用场景，支持 Markdown 渲染。
- **🎨 智能视觉辅助**：集成 AI 生图能力，可根据节点内容生成写实风格的配图，提升思维导图的视觉冲击力与记忆点。
- **📊 全篇智能总结**：一键梳理整张画布的所有想法，提取核心逻辑、主要维度和最终洞察，生成精炼的全局总结。
- **📂 结构化导出**：支持将整个思维图谱导出为标准的 Markdown 大纲，包含节点描述、回答内容及层级结构。
- **🔐 本地化配置**：所有的 API 配置（Key、Base URL 等）和语言偏好均保存在浏览器 `localStorage` 中，隐私且安全。

---

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite 5](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **画布引擎**: [@vue-flow/core](https://vueflow.dev/)
- **国际化**: [vue-i18n](https://vue-i18n.intlify.dev/)
- **图标库**: [lucide-vue-next](https://lucide.dev/)
- **Markdown 渲染**: [markdown-it](https://github.com/markdown-it/markdown-it)

---

## 📂 代码结构指南

```text
src/
├── components/             # UI 组件库
│   ├── TopNav.vue          # 顶部工具栏：处理适配、布局、导出、总结、语言切换等全局动作
│   ├── SideNav.vue         # 左侧配置栏：控制小地图、连线样式、背景网格及 API 设置入口
│   ├── BottomBar.vue       # 底部输入框：核心想法的初始入口
│   ├── WindowNode.vue      # 自定义节点：核心 UI，包含扩展、回答、生图及追问逻辑
│   ├── SettingsModal.vue   # API 配置弹窗：支持文本/图片生成的 Base URL 和 Key 设置
│   ├── SummaryModal.vue    # 全篇总结展示弹窗
│   ├── ImagePreviewModal.vue # 节点配图全屏预览弹窗
│   └── ResetConfirmModal.vue # 画布重置确认弹窗
├── composables/            # 核心逻辑层
│   └── useThinkFlow.ts     # 核心业务 Hook：管理节点状态、API 调用、布局算法、持久化逻辑等
├── i18n/                   # 国际化
│   ├── locales/            # 语言包 (zh.json, en.json)
│   └── index.ts            # i18n 初始化
├── App.vue                 # 应用入口：组合各组件并配置 VueFlow 画布环境
└── main.ts                 # 程序起点
```

### 核心逻辑设计

- **状态管理**: 采用 `useThinkFlow` 组合式函数统一管理画布节点、连线及 UI 状态。通过解构方式在 `App.vue` 中分发给各子组件。
- **布局算法**: 实现了基于子树高度动态计算的“横向树形”排版算法，能够自动适配节点展开后的尺寸变化，确保图谱整齐。
- **API 通信**: 适配 OpenAI 格式接口，支持自定义模型名称及 Base URL。

---

## 🚀 快速开始

### 1. 环境准备

- Node.js 18+
- npm 或 pnpm

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可开始使用。

---

## ⚙️ 配置说明

本项目不提供后端服务，需用户自行配置 API 接口：

1. 点击左侧工具栏底部的 **设置** 图标。
2. **默认模式**: 预设了部分体验接口（可能有请求限制）。
3. **自定义模式**:
    - **文本生成**: 填入 OpenAI 兼容格式的 `Base URL`、`Model Name` 和 `API Key`。
    - **图片生成**: 填入支持 `dall-e` 格式或其他生图 API 的配置。

---

## 📖 功能使用手册

1. **开启新会话**: 在底部输入框输入您的想法（如“未来城市的交通方式”），按回车。
2. **节点操作**:
    - **扩展**: 点击节点右侧的 `+` 或输入后续要求，AI 会继续在该分支下生成子节点。
    - **回答**: 点击书本图标，获取该节点的深度解析。
    - **生图**: 点击图片图标，为该想法生成视觉参考。
3. **整理画布**:
    - **布局**: 点击顶部“布局”按钮，自动按层级整理所有节点。
    - **导出**: 点击顶部“导出”按钮，获取 Markdown 格式的内容副本。

---

## 📄 开源协议

MIT License
