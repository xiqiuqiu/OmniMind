<script setup lang="ts">
/**
 * 自定义节点：StickyNoteNode
 * - 用于用户手动添加的纯文本便签
 * - 样式简约，灵感来自便签纸
 */
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { X, StickyNote } from 'lucide-vue-next'

const props = defineProps<{
    id: string
    data: any
    selected: boolean
    t: any
    config: any
    updateNode: (id: string, payload: any) => void
    removeNodes: (nodes: any[]) => void
}>()

const isEditing = ref(false)
const textInput = ref<HTMLTextAreaElement | null>(null)

const startEdit = () => {
    isEditing.value = true
    setTimeout(() => {
        textInput.value?.focus()
    }, 0)
}

const stopEdit = () => {
    isEditing.value = false
}

const handleRemove = () => {
    props.removeNodes([{ id: props.id }])
}
</script>

<template>
    <div
        class="sticky-note group transition-all duration-300 relative"
        :class="{
            'ring-2 ring-orange-400 ring-offset-2': props.selected,
            'rotate-1': props.id.charCodeAt(0) % 2 === 0,
            '-rotate-1': props.id.charCodeAt(0) % 2 !== 0
        }"
    >
        <!-- 移除按钮 -->
        <button
            @click.stop="handleRemove"
            class="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500 z-10"
        >
            <X class="w-3 h-3" />
        </button>

        <div class="sticky-header flex items-center gap-1.5 mb-2 opacity-50">
            <StickyNote class="w-3 h-3" />
            <span class="text-[8px] font-black uppercase tracking-widest">Sticky Note</span>
        </div>

        <div v-if="!isEditing" @dblclick="startEdit" class="min-h-[60px] cursor-text">
            <p class="text-xs font-mono text-slate-700 leading-relaxed whitespace-pre-wrap">
                {{ props.data.label || 'Double click to edit...' }}
            </p>
        </div>
        <textarea
            v-else
            ref="textInput"
            v-model="props.data.label"
            @blur="stopEdit"
            @keyup.esc="stopEdit"
            class="w-full min-h-[100px] bg-transparent border-none outline-none text-xs font-mono text-slate-800 leading-relaxed resize-none overflow-hidden"
            placeholder="Type your thoughts..."
        ></textarea>

        <!-- 连线点（可选，便签通常不需要强连线，但保留以防万一） -->
        <Handle type="target" :position="Position.Left" class="!opacity-0" />
        <Handle type="source" :position="Position.Right" class="!opacity-0" />
    </div>
</template>

<style scoped>
.sticky-note {
    @apply w-[200px] bg-[#fff9c4] p-4 shadow-md border border-[#fbc02d]/30;
    /* 模拟纸张边缘效果 */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
}

.sticky-note::before {
    content: '';
    @apply absolute top-0 right-0 w-4 h-4 bg-white/40;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
}
</style>
