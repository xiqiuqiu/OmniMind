# ThinkFlowAI - Agent Development Guide

This document provides essential information for agentic coding agents working in the ThinkFlowAI repository.

## Project Overview

ThinkFlowAI is a Vue 3 + TypeScript application for AI-powered mind mapping and idea expansion. It uses Vue Flow for interactive node-based canvas, Supabase for cloud storage, and Tailwind CSS for styling.

## Build & Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Deploy to Cloudflare Workers
npm run deploy

# Preview production build
npm run preview

# Type checking (Vue TypeScript)
npm run type-check  # (if available, use vue-tsc)

# Note: No linting or testing framework currently configured
```

## Project Structure

```
src/
├── components/          # Vue components
├── composables/         # Vue composables (business logic)
├── services/           # API and configuration services
├── lib/                # External library integrations (Supabase)
├── i18n/               # Internationalization
└── main.ts            # Application entry point
```

## Code Style Guidelines

### TypeScript & Vue 3
- Use `<script setup lang="ts">` for all Vue components
- Strict TypeScript enabled - always type props, refs, and function parameters
- Use composition API with `ref`, `reactive`, `computed`, and `watch`
- Export composables as functions returning reactive state/methods

### Import Organization
```typescript
// 1. Vue core imports
import { ref, computed, onMounted } from 'vue'

// 2. Third-party libraries
import { useVueFlow } from '@vue-flow/core'
import { createClient } from '@supabase/supabase-js'

// 3. Internal imports (use @ alias)
import { DEFAULT_CONFIG } from '@/services/config'
import { useAuth } from '@/composables/useAuth'
```

### Naming Conventions
- **Components**: PascalCase (WindowNode.vue, TopNav.vue)
- **Composables**: camelCase with `use` prefix (useThinkFlow.ts, useAuth.ts)
- **Functions**: camelCase, descriptive names (expandIdea, generateSummary)
- **Variables**: camelCase, semantic naming (activeNodeId, isLoading)
- **Constants**: UPPER_SNAKE_CASE (DEFAULT_CONFIG, API_KEY)

### Vue Component Structure
```vue
<script setup lang="ts">
/**
 * Component purpose description
 * - Key responsibilities
 * - Important interactions
 */

// 1. Imports (Vue, third-party, internal)
// 2. Props & emits definition
// 3. Component state (refs, computed)
// 4. Event handlers
// 5. Lifecycle hooks
</script>

<template>
  <!-- Component template -->
</template>

<style scoped>
/* Component-specific styles */
</style>
```

### Error Handling
- Use try-catch for async operations
- Log errors with context: `console.error('[ComponentName] Error description:', error)`
- Provide user feedback for critical errors
- Handle API errors gracefully with fallback states

### State Management
- Use composables for business logic and state
- Keep component state local when possible
- Use reactive objects for related state
- Prefer `computed` for derived state

### Styling Guidelines
- Use Tailwind CSS classes primarily
- Custom CSS only for complex animations or Vue Flow overrides
- Scoped styles in components when needed
- Follow existing color scheme (slate, orange accents)
- Maintain responsive design patterns

### API Integration
- Use axios for HTTP requests
- Handle loading states and errors
- Use environment variables for sensitive data
- Implement proper error boundaries

### Vue Flow Specific
- Custom node types: `window`, `sticky`
- Use Handle components for connections
- Implement proper node positioning and sizing
- Handle viewport and zoom states
- Custom styling via CSS overrides

## Key Dependencies

- **Vue 3**: Frontend framework
- **TypeScript**: Type safety
- **Vue Flow**: Interactive node canvas
- **Tailwind CSS**: Utility-first styling
- **Supabase**: Backend/database
- **Vue I18n**: Internationalization
- **Axios**: HTTP client

## Development Notes

- No test framework currently configured
- No linting tools set up (consider adding ESLint + Prettier)
- Uses Vite for build tooling
- Cloudflare Workers for deployment
- Chinese/English bilingual support

## Common Patterns

### Composable Pattern
```typescript
export function useFeatureName() {
  const state = ref()
  const computed = computed(() => state.value)
  
  const action = async () => {
    try {
      // logic
    } catch (error) {
      console.error('[FeatureName] Error:', error)
    }
  }
  
  return { state, computed, action }
}
```

### Component Props
```typescript
interface Props {
  t: Translate
  config: Config
  onAction: () => void
}

const props = defineProps<Props>()
```

### Event Handling
```typescript
const emit = defineEmits<{
  close: []
  update: [value: string]
}>()
```

When working in this codebase, prioritize type safety, follow the established patterns, and maintain consistency with existing code style.