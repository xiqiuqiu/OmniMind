<h1 align="center">🧠 OmniMind</h1>

<p align="center">
  <strong>Transform Ideas into Visual Knowledge Graphs with AI</strong><br>
  <em>Local-First · Privacy-Focused · Infinite Exploration</em>
</p>

<p align="center">
  <a href="https://github.com/vuejs/core"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue"></a>
  <a href="https://github.com/vitejs/vite"><img src="https://img.shields.io/badge/vite-5.x-646cff.svg" alt="vite"></a>
  <a href="https://github.com/microsoft/TypeScript"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"></a>
  <a href="https://github.com/tailwindlabs/tailwindcss"><img src="https://img.shields.io/badge/tailwind-3.x-38bdf8.svg" alt="tailwind"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="license"></a>
</p>

<p align="center">
  English | <a href="./README.md">中文</a>
</p>

---

## 🎯 What is OmniMind?

**OmniMind** is an AI-powered mind mapping tool that transforms vague ideas into clear, structured knowledge graphs.

Simply input a core concept, and AI will automatically:
- 🌳 **Expand Mind Trees** - Generate complete knowledge frameworks from a single idea
- 💬 **Conversational Exploration** - Dive deep into any branch through natural dialogue
- 📝 **Deep Analysis** - Generate 300-500 word professional analyses for any node
- 🎨 **Visual Imagery** - Create AI-generated images to illustrate abstract concepts
- 📊 **Global Summaries** - Extract key insights from your entire knowledge graph

**Local-First Design** - All data stored in your browser, supports any OpenAI-compatible API, no privacy concerns.

---

## ✨ Core Features

### 🚀 Intelligent Mind Expansion

**Say Goodbye to "Blank Page Anxiety"** - Don't know where to start? Input an idea and AI builds the initial framework for you.

- **Context-Aware Follow-ups** - AI understands the complete path from root to current node, every response is contextually grounded
- **Two Thinking Modes** - Switch between "Creative Mode" (idea-focused) and "Precise Mode" (logic-focused)
- **Smart Layout** - Automatically arranges nodes to avoid overlaps and keep your graph clean

### 🔍 Deep Content Exploration

**More Than Just Outlines** - Every node can be explored in depth:

- **Deep Dive Answers** - Generate detailed analyses with one click, Markdown supported
- **AI-Generated Images** - Create visual representations for abstract concepts
- **Graph Chat** - Ask questions based on your entire knowledge graph
- **Global Summaries** - Automatically analyze your entire mind map and extract key insights

### 🎨 Powerful Interaction Experience

**As Natural as Thinking** - Smooth interactions keep you focused on ideas:

- **Presentation Mode** - Full-screen display with keyboard navigation (←/→) between nodes
- **Real-time Search** - Quickly locate any node
- **Hierarchical Dragging** - Child nodes automatically follow when dragging parent nodes
- **Subtree Collapse** - Manage large graphs, freely switch between macro and micro views
- **Alignment Guides** - Smart alignment references when dragging nodes
- **Sticky Notes** - Add free-form notes anywhere on the canvas
- **Markdown Export** - Export your entire mind map as a structured document

### 🔐 Privacy & Flexibility

- **Local-First** - Data stored in browser localStorage, you control your data
- **Cloud Sync** (Optional) - Supabase cloud storage support for multi-device sync
- **Multi-Project Management** - Create and switch between multiple independent mind maps
- **API Freedom** - Support any OpenAI-compatible API (OpenAI, Zhipu, Tongyi, etc.)
- **Bilingual** - Complete UI localization in English and Chinese

---

## 🎬 Quick Start

### Try Online

Visit now: [omnimind.sigclr.com](https://omnimind.sigclr.com/)

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/xiqiuqiu/ThinkFlowAI.git
cd ThinkFlowAI

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` to use.

---

## ⚙️ Configure Your API

The project uses **OpenRouter** by default (a unified interface for multiple AI models).

### Method 1: Use OpenRouter (Recommended)

1. Visit [OpenRouter](https://openrouter.ai/) to register and get an API Key
2. Click the ⚙️ Settings button in the top right
3. Select "Custom Configuration" and fill in:
   - **Chat API**:
     - Base URL: `https://openrouter.ai/api/v1/chat/completions`
     - Model: `google/gemini-2.5-flash` (or other supported models)
     - API Key: Your OpenRouter Key
   - **Image API**:
     - Base URL: `https://openrouter.ai/api/v1/chat/completions`
     - Model: `bytedance-seed/seedream-4.5` (or other supported image models)
     - API Key: Your OpenRouter Key

### Method 2: Use Environment Variables

Create a `.env` file:

```bash
VITE_CHAT_BASE_URL=https://openrouter.ai/api/v1/chat/completions
VITE_CHAT_MODEL=google/gemini-2.5-flash
VITE_CHAT_API_KEY=your-openrouter-key

VITE_IMAGE_BASE_URL=https://openrouter.ai/api/v1/chat/completions
VITE_IMAGE_MODEL=bytedance-seed/seedream-4.5
VITE_IMAGE_API_KEY=your-openrouter-key
```

### Compatibility Notes

- **Chat API**: Fully compatible with OpenAI Chat Completions format, works with any compatible service (OpenAI, Zhipu, Tongyi, etc.)
- **Image API**: Currently uses OpenRouter's image generation format. To use OpenAI DALL-E or other services, you'll need to modify the response parsing code in `src/composables/useThinkFlow.ts`

---

## 🎯 Use Cases

- **Learning New Topics** - Input a subject, AI builds a complete knowledge framework
- **Brainstorming** - Start with one idea, explore all possibilities
- **Writing Outlines** - Quickly generate article or report structures
- **Project Planning** - Break down complex projects into actionable subtasks
- **Knowledge Organization** - Transform fragmented information into structured knowledge graphs
- **Presentation Prep** - Use presentation mode to showcase your thinking process

---

## 🛠️ Tech Stack

- **Vue 3** - Modern reactive framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast development
- **VueFlow** - Powerful flow diagram engine
- **Tailwind CSS** - Elegant UI design
- **Supabase** (Optional) - Cloud data sync

---

## 📦 Deployment

### Deploy to Cloudflare Pages (Recommended)

The project is pre-configured for Cloudflare Pages deployment:

```bash
# Build and deploy in one command
npm run deploy
```

First-time deployment requires Cloudflare login:
```bash
npx wrangler login
```

### Deploy to Other Platforms

As a standard Vite application, you can also deploy to other static hosting services:

```bash
# Build for production
npm run build
```

The generated `dist/` directory can be deployed to:
- **Vercel** - Import GitHub repository, auto-detects Vite projects
- **Netlify** - Drag and drop `dist` folder or connect Git repository
- **GitHub Pages** - Use GitHub Actions for automatic deployment
- Any static file hosting service

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## ❤️ Acknowledgements

This project is based on [ThinkFlowAI](https://github.com/ThinkFlowAI/ThinkFlowAI).

Thanks to the original author [lz-t](https://github.com/lz-t) and the [ThinkFlowAI Team](https://github.com/ThinkFlowAI) for their open source contributions.

---

<p align="center">
  If this project helps you, please give it a ⭐️ to show your support!
</p>
