# Project Structure & Architecture

## Directory Organization

```
src/
├── components/             # UI Component Layer
│   ├── WindowNode.vue      # Core logic carrier: custom node with image/answer/follow-up capabilities
│   ├── TopNav.vue          # Top navigation with controls
│   ├── SideNav.vue         # Side navigation panel
│   ├── BottomBar.vue       # Input bar for new ideas
│   ├── SettingsModal.vue   # API configuration modal
│   ├── SummaryModal.vue    # Session summary display
│   ├── ImagePreviewModal.vue # Image preview modal
│   └── ResetConfirmModal.vue # Reset confirmation dialog
├── services/               # Service Layer
│   └── config.ts           # Core config: API endpoints, model names, global API keys
├── composables/            # Business Logic Layer
│   └── useThinkFlow.ts     # Business heart: reactive state management, API orchestration, layout algorithms
├── i18n/                   # Internationalization
│   ├── index.ts            # i18n setup and configuration
│   └── locales/            # Translation files
│       ├── zh.json         # Chinese translations
│       └── en.json         # English translations
├── App.vue                 # Application skeleton: VueFlow container and component assembly
├── main.ts                 # Application entry point
├── style.css               # Global styles
└── vite-env.d.ts          # Vite type definitions
```

## Architecture Patterns

### Composition API Pattern
- All components use Vue 3 Composition API
- Business logic centralized in `useThinkFlow.ts` composable
- UI components are primarily presentational, receiving state and actions as props

### Component Responsibilities

#### App.vue (Orchestrator)
- Assembles all UI components
- Provides VueFlow container configuration
- Handles global event coordination (fullscreen, keyboard shortcuts)
- Passes business logic from composable to child components

#### WindowNode.vue (Core Node Logic)
- Custom VueFlow node implementation
- Handles node-specific interactions (expand, deep dive, image generation)
- Manages node state display (loading, error, content states)
- Implements node-level UI (title, description, actions, content)

#### useThinkFlow.ts (Business Logic Hub)
- Centralized state management for entire application
- API orchestration for chat, image generation, and summarization
- Canvas layout algorithms and node positioning
- Persistence layer (localStorage integration)
- Error handling and user feedback

### Data Flow Architecture

1. **User Input** → BottomBar.vue → useThinkFlow.expandIdea()
2. **API Response** → useThinkFlow processes → VueFlow nodes/edges updated
3. **Node Interactions** → WindowNode.vue → useThinkFlow actions → State updates
4. **State Changes** → Reactive updates → UI re-renders

### State Management

- **Reactive State**: Vue 3 reactivity system with `ref()` and `reactive()`
- **Persistence**: localStorage for canvas state, API config, and UI preferences
- **Computed Properties**: Derived state like active paths, node relationships
- **Watchers**: Auto-save functionality and state synchronization

## File Naming Conventions

- **Components**: PascalCase (e.g., `WindowNode.vue`, `SettingsModal.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useThinkFlow.ts`)
- **Services**: camelCase (e.g., `config.ts`)
- **Types**: PascalCase interfaces/types in component files or separate `.d.ts` files

## Import Patterns

- **Vue Flow**: Import specific components and utilities as needed
- **Icons**: Import from `lucide-vue-next` on-demand
- **Composables**: Single import of business logic functions
- **i18n**: Use `useI18n()` composable in components

## Styling Approach

- **Tailwind CSS**: Utility-first styling throughout
- **Component Scoped**: Minimal use of scoped styles, prefer Tailwind classes
- **Custom CSS**: Global styles in `style.css` for VueFlow overrides and animations
- **Responsive**: Mobile-first responsive design with Tailwind breakpoints