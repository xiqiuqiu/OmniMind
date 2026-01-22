# Technology Stack & Build System

## Core Technologies

| Component | Technology |
|-----------|------------|
| **Frontend Framework** | Vue 3 (Composition API) |
| **Build Tool** | Vite 5 + TypeScript |
| **Canvas Engine** | @vue-flow/core (high-performance, highly customizable) |
| **UI/Styling** | Tailwind CSS + Lucide Icons |
| **Internationalization** | Vue-I18n (Chinese/English seamless switching) |
| **Markdown** | Markdown-it (node content rendering) |

## Key Dependencies

### Vue Flow Ecosystem
- `@vue-flow/core` - Main canvas and node management
- `@vue-flow/background` - Grid/dot background patterns
- `@vue-flow/controls` - Zoom/pan controls
- `@vue-flow/minimap` - Overview minimap
- `@vue-flow/node-resizer` - Node resizing capabilities

### Utilities
- `axios` - HTTP client for API requests
- `html-to-image` - Canvas export functionality
- `lucide-vue-next` - Icon system
- `markdown-it` - Markdown parsing and rendering

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

## Configuration Files

- `vite.config.ts` - Vite configuration with Vue plugin and path aliases
- `tailwind.config.js` - Tailwind CSS configuration with custom colors
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## API Integration

The application supports two API modes:
- **Default Mode**: Uses pre-configured demo endpoints via Cloudflare Workers
- **Custom Mode**: User-configurable OpenAI-compatible endpoints

API configuration is managed in `src/services/config.ts` and persisted in localStorage.

## Deployment

Built for static hosting with Vite's optimized production build. Supports deployment to:
- Cloudflare Pages
- Vercel
- Netlify
- Any static hosting service

## Development Notes

- Uses Vue 3 Composition API throughout
- Reactive state management with Vue's built-in reactivity
- Local-first architecture with localStorage persistence
- CORS handling may require proxy configuration for custom APIs