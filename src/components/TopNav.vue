<script setup lang="ts">
/**
 * 顶部导航栏
 * - 左侧：项目选择器
 * - 右侧：用户头像（点击展开菜单：导出、重置、演示、摘要、设置、注销）
 */
import { ref, onMounted, onUnmounted } from "vue";
import {
  LogOut,
  User,
  ChevronDown,
  Download,
  FileCode,
  Sparkles,
  Trash2,
  Play,
  Settings,
  Globe,
  LogIn,
  Cloud,
} from "lucide-vue-next";
import ProjectSelector from "./ProjectSelector.vue";

const props = defineProps<{
  t: any;
  locale: string;
  config: any;
  isPresenting: boolean;
  onTogglePresentation: () => void;
  onGenerateSummary: () => void;
  onExportMarkdown: () => void;
  onExportHTML: () => void;
  onStartNewSession: () => void;
  // Auth
  isAuthenticated: boolean;
  user: { email?: string } | null;
  onShowAuthModal: () => void;
  onSignOut: () => void;
}>();

const emit = defineEmits<{
  (e: "toggle-locale"): void;
}>();

const isUserMenuOpen = ref(false);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const handleDocumentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".user-menu-container")) {
    closeUserMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});

// Helper to close menu after action
const action = (fn: () => void) => {
  fn();
  closeUserMenu();
};
</script>

<template>
  <nav
    class="flex-none w-full bg-white border-b border-gray-200/40 z-30 px-4 md:px-6 h-14 flex items-center justify-between"
  >
    <!-- 左侧：系统名称 + 项目选择器 -->
    <div class="pointer-events-auto flex items-center gap-2 md:gap-3 min-w-0">
      <!-- Logo -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm"
        >
          <Cloud class="w-5 h-5 text-white" fill="white" />
        </div>
        <span
          class="font-heading font-semibold text-slate-800 tracking-tight text-sm md:text-base"
          >OmniMind</span
        >
      </div>

      <div class="h-4 w-px bg-gray-300 hidden sm:block flex-shrink-0"></div>

      <ProjectSelector :t="props.t" />
    </div>

    <!-- 右侧：工具组 + 用户菜单 -->
    <div class="pointer-events-auto flex items-center gap-1 md:gap-2">
      <!-- 工具图标组 (仅认证用户可见) -->
      <template v-if="props.isAuthenticated">
        <!-- AI 总结 -->
        <button
          @click="props.onGenerateSummary"
          class="p-2 rounded-lg hover:bg-orange-50 text-slate-600 hover:text-orange-600 transition-colors group relative hidden sm:flex items-center justify-center"
          :title="props.t('nav.summary')"
        >
          <Sparkles class="w-4 h-4" />
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ props.t("nav.summary") }}
          </span>
        </button>

        <!-- 演示模式 -->
        <button
          @click="props.onTogglePresentation"
          class="p-2 rounded-lg hover:bg-green-50 text-slate-600 hover:text-green-600 transition-colors group relative hidden md:flex items-center justify-center"
          :title="props.t('nav.presentation')"
        >
          <Play class="w-4 h-4" />
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ props.t("nav.presentation") }}
          </span>
        </button>

        <!-- 导出 Markdown -->
        <button
          @click="props.onExportMarkdown"
          class="p-2 rounded-lg hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors group relative hidden lg:flex items-center justify-center"
          :title="props.t('nav.exportMd')"
        >
          <Download class="w-4 h-4" />
          <span
            class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            {{ props.t("nav.exportMd") }}
          </span>
        </button>

        <div class="h-6 w-px bg-gray-200 hidden sm:block"></div>
      </template>

      <!-- 用户菜单容器 -->
      <div class="user-menu-container relative">
        <!-- 未登录：登录按钮 -->
        <button
          v-if="!props.isAuthenticated"
          @click="props.onShowAuthModal"
          class="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-xs font-medium"
        >
          <LogIn class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">{{ props.t("auth.login") }}</span>
        </button>

        <!-- 已登录：用户头像按钮 -->
        <div v-else class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-2 bg-white rounded-lg pl-1 pr-2 md:pr-3 py-1 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div
              class="w-7 h-7 rounded-md bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-semibold text-xs"
            >
              {{ props.user?.email?.charAt(0).toUpperCase() || "U" }}
            </div>
            <span
              class="text-xs font-medium text-slate-700 max-w-[80px] truncate hidden md:block"
            >
              {{ props.user?.email?.split("@")[0] }}
            </span>
            <ChevronDown
              class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block"
              :class="{ 'rotate-180': isUserMenuOpen }"
            />
          </button>

          <!-- 下拉菜单 -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform -translate-y-1 opacity-0 scale-95"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform -translate-y-1 opacity-0 scale-95"
          >
            <div
              v-if="isUserMenuOpen"
              class="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden py-1 z-50 origin-top-right"
            >
              <!-- 用户信息 -->
              <div class="px-3 py-2 border-b border-gray-100">
                <p class="text-xs font-medium text-slate-900 truncate">
                  {{ props.user?.email }}
                </p>
              </div>

              <!-- 移动端显示的功能项 -->
              <div class="py-1 sm:hidden border-b border-gray-100">
                <button
                  @click="action(props.onGenerateSummary)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 transition-colors"
                >
                  <Sparkles class="w-3.5 h-3.5" />
                  {{ props.t("nav.summary") }}
                </button>
              </div>

              <div class="py-1 md:hidden border-b border-gray-100">
                <button
                  @click="action(props.onTogglePresentation)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-green-50 hover:text-green-600 flex items-center gap-2 transition-colors"
                >
                  <Play class="w-3.5 h-3.5" />
                  {{ props.t("nav.presentation") }}
                </button>
              </div>

              <div class="py-1 lg:hidden border-b border-gray-100">
                <button
                  @click="action(props.onExportMarkdown)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                >
                  <Download class="w-3.5 h-3.5" />
                  {{ props.t("nav.exportMd") }}
                </button>
                <button
                  @click="action(props.onExportHTML)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2 transition-colors"
                >
                  <FileCode class="w-3.5 h-3.5" />
                  {{ props.t("nav.exportHtml") }}
                </button>
              </div>

              <!-- 导出 HTML (桌面端也显示) -->
              <div class="py-1 hidden lg:block">
                <button
                  @click="action(props.onExportHTML)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2 transition-colors"
                >
                  <FileCode class="w-3.5 h-3.5" />
                  {{ props.t("nav.exportHtml") }}
                </button>
              </div>

              <div class="h-px bg-gray-100 my-1"></div>

              <!-- 其他操作 -->
              <div class="py-1">
                <button
                  @click="action(props.onStartNewSession)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                  {{ props.t("nav.reset") }}
                </button>
              </div>

              <div class="h-px bg-gray-100 my-1"></div>

              <div class="py-1">
                <button
                  @click="action(() => emit('toggle-locale'))"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <Globe class="w-3.5 h-3.5" />
                  {{ props.locale === "zh" ? "English" : "中文" }}
                </button>
                <button
                  @click="action(props.onSignOut)"
                  class="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                >
                  <LogOut class="w-3.5 h-3.5" />
                  {{ props.t("auth.logout") }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.shadow-glass {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
</style>
