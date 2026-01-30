<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Trash2 } from "lucide-vue-next";

const props = defineProps<{
  x: number;
  y: number;
  nodeId: string;
  t: (key: string) => string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "delete", id: string): void;
}>();

const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("contextmenu", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("contextmenu", handleClickOutside); // Clean up context menu listener too
});
</script>

<template>
  <div
    ref="menuRef"
    class="context-menu"
    :style="{ top: `${y}px`, left: `${x}px` }"
    @contextmenu.prevent
  >
    <button class="menu-item delete" @click="emit('delete', nodeId)">
      <Trash2 class="w-3.5 h-3.5" />
      <span>{{ t("node.delete") }}</span>
    </button>
  </div>
</template>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 140px;
  padding: 4px;
  overflow: hidden;
  animation: fadeIn 0.1s ease-out;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #475569;
  transition: all 0.2s;
}

.menu-item:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.menu-item.delete:hover {
  background-color: #fef2f2;
  color: #ef4444;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
