# ThinkFlow AI

English | [中文](./README.zh-CN.md)

ThinkFlow AI is a lightweight, local-first, AI-driven mind mapping workspace. It automatically transforms a simple idea into a structured and highly visual mind map using the divergent thinking power of AI.

This project aims to provide a smooth, zero-backend-config thinking assistant that offers deep analytical capabilities, supporting users during brainstorming, knowledge organization, and creative expansion.

---

## 🌟 Key Highlights

- **🚀 Idea to Graph**: Just enter a core concept, and the AI will automatically generate a root node and expand into multiple insightful child nodes.
- **🧠 Context-Aware Follow-up**: Support for follow-up questions on any node. The AI considers the "thinking path" from root to the current node to ensure logical consistency.
- **📖 Deep Answer (Deep Dive)**: More than just keywords—click "Answer" to have the AI generate detailed analysis, background, and applications for a node, rendered in Markdown.
- **🎨 Intelligent Visual Aid**: Integrated AI image generation creates realistic visuals based on node content, enhancing the visual impact and memory retention of your mind map.
- **📊 Session Summary**: One-click summary of the entire canvas, extracting core logic, main dimensions, and final insights.
- **📂 Structured Export**: Export the entire mind map as a standard Markdown outline, including node descriptions, answers, and hierarchical structure.
- **🔐 Local-First Configuration**: All API configurations (Key, Base URL, etc.) and language preferences are stored in the browser's `localStorage`, ensuring privacy and security.

---

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Graph Engine**: [@vue-flow/core](https://vueflow.dev/)
- **I18n**: [vue-i18n](https://vue-i18n.intlify.dev/)
- **Icon Library**: [lucide-vue-next](https://lucide.dev/)
- **Markdown Rendering**: [markdown-it](https://github.com/markdown-it/markdown-it)

---

## 📂 Code Structure Guide

```text
src/
├── components/             # UI Components
│   ├── TopNav.vue          # Top toolbar: Handles fit, layout, export, summary, and language toggle.
│   ├── SideNav.vue         # Left side nav: Controls MiniMap, edge styles, background, and settings entry.
│   ├── BottomBar.vue       # Bottom input bar: Initial entry for core ideas.
│   ├── WindowNode.vue      # Custom Node: Core UI for expanding, answers, image generation, and follow-ups.
│   ├── SettingsModal.vue   # API Settings: Configuration for Text and Image generation endpoints.
│   ├── SummaryModal.vue    # Modal for displaying the session summary.
│   ├── ImagePreviewModal.vue # Modal for fullscreen node image preview.
│   └── ResetConfirmModal.vue # Confirmation modal for canvas reset.
├── composables/            # Core Logic Layer
│   └── useThinkFlow.ts     # Core Business Hook: Manages node state, API calls, layout algorithms, and persistence.
├── i18n/                   # Internationalization
│   ├── locales/            # Language packs (zh.json, en.json)
│   └── index.ts            # I18n initialization
├── App.vue                 # App Entry: Composes components and configures the VueFlow environment.
└── main.ts                 # Program Entry Point
```

### Core Design Principles

- **State Management**: Uses `useThinkFlow` composable to centralize management of nodes, edges, and UI states, distributed to child components via `App.vue`.
- **Layout Algorithm**: Implements a horizontal tree layout algorithm based on dynamic subtree height calculations, automatically adapting to node size changes.
- **API Communication**: Compatible with OpenAI-style endpoints, supporting custom model names and Base URLs.

---

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- npm or pnpm

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Access `http://localhost:5173` to start.

---

## ⚙️ Configuration

This project does not provide a backend; users must configure their own API endpoints:

1. Click the **Settings** icon at the bottom of the left sidebar.
2. **Default Mode**: Uses pre-configured trial endpoints (subject to rate limits).
3. **Custom Mode**:
    - **Text Gen**: Enter OpenAI-compatible `Base URL`, `Model Name`, and `API Key`.
    - **Image Gen**: Enter configuration for `dall-e` or other image generation APIs.

---

## 📖 Usage Manual

1. **Start a Session**: Enter your idea in the bottom input (e.g., "Future of Urban Transportation") and press Enter.
2. **Node Actions**:
    - **Expand**: Click the `+` on a node or enter a follow-up requirement to generate child nodes.
    - **Answer**: Click the book icon for a deep analysis of that node.
    - **Image**: Click the image icon to generate a visual reference for the idea.
3. **Organize Canvas**:
    - **Layout**: Click the "Layout" button at the top to automatically organize all nodes.
    - **Export**: Click the "Export" button at the top to get a Markdown copy of your work.

---

## 📄 License

MIT License
