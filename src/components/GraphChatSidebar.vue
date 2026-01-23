<script setup lang="ts">
/**
 * 图谱对话侧边栏
 * - 针对当前图谱内容进行问答 (RAG)
 * - 终端美学风格
 */
import { ref, onMounted, nextTick, watch } from 'vue'
import { X, Send, Trash2, Terminal, User, Bot, Sparkles, MessageCircle } from 'lucide-vue-next'

const props = defineProps<{
    show: boolean
    t: any
    isChatting: boolean
    messages: { role: 'user' | 'assistant'; content: string }[]
    onSendMessage: (msg: string) => void
    onClose: () => void
}>()

const inputMessage = ref('')
const scrollContainer = ref<HTMLElement | null>(null)

const handleSend = () => {
    if (!inputMessage.value.trim() || props.isChatting) return
    props.onSendMessage(inputMessage.value)
    inputMessage.value = ''
}

const scrollToBottom = async () => {
    await nextTick()
    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }
}

watch(() => props.messages.length, scrollToBottom)
// 监听最后一条消息内容的变化，实现流式滚屏
watch(
    () => props.messages[props.messages.length - 1]?.content,
    () => {
        if (props.isChatting) {
            scrollToBottom()
        }
    }
)
watch(
    () => props.show,
    val => {
        if (val) scrollToBottom()
    }
)

const clearChat = () => {
    // 逻辑可以在 useThinkFlow 中实现，这里简单处理
    props.messages.splice(0, props.messages.length)
}
</script>

<template>
    <div
        class="fixed top-0 right-0 h-full w-80 bg-white border-l border-slate-200 z-[100] flex flex-col transition-transform duration-500 ease-in-out shadow-2xl"
        :class="show ? 'translate-x-0' : 'translate-x-full'"
    >
        <!-- Header -->
        <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div class="flex items-center gap-2">
                <Terminal class="w-4 h-4 text-orange-500" />
                <h2 class="text-xs font-black uppercase tracking-widest text-slate-700">{{ t('chat.title') }}</h2>
            </div>
            <button @click="onClose" class="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-400">
                <X class="w-4 h-4" />
            </button>
        </div>

        <!-- Chat Content -->
        <div ref="scrollContainer" class="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white">
            <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                <Bot class="w-12 h-12 mb-3" :stroke-width="1" />
                <p class="text-[10px] font-bold uppercase tracking-tighter">{{ t('chat.empty') }}</p>
            </div>

            <div v-for="(msg, idx) in messages" :key="idx" class="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div class="flex items-center gap-1.5 opacity-50">
                    <component :is="msg.role === 'user' ? User : Bot" class="w-3 h-3" />
                    <span class="text-[8px] font-black uppercase tracking-widest">{{ msg.role === 'user' ? 'User' : 'AI Assistant' }}</span>
                </div>
                <div
                    class="p-3 rounded-xl text-xs font-medium leading-relaxed"
                    :class="msg.role === 'user' ? 'bg-slate-100 text-slate-700 ml-4' : 'bg-orange-50 text-slate-800 mr-4 border border-orange-100'"
                >
                    <p class="whitespace-pre-wrap font-mono">{{ msg.content }}</p>
                </div>
            </div>

            <div v-if="isChatting && (!messages.length || !messages[messages.length - 1].content)" class="flex flex-col gap-1.5 animate-pulse">
                <div class="flex items-center gap-1.5 opacity-50">
                    <Bot class="w-3 h-3" />
                    <span class="text-[8px] font-black uppercase tracking-widest">AI Thinking</span>
                </div>
                <div class="bg-orange-50/50 p-3 rounded-xl border border-orange-100/50 mr-4">
                    <div class="flex gap-1">
                        <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                        <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input -->
        <div class="p-4 border-t border-slate-100 bg-slate-50/50">
            <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400/20 focus-within:border-orange-400 transition-all">
                <MessageCircle class="w-3.5 h-3.5 text-orange-500" />
                <input
                    v-model="inputMessage"
                    @keyup.enter="handleSend"
                    :placeholder="t('chat.placeholder')"
                    class="flex-grow bg-transparent border-none outline-none text-xs font-mono text-slate-700 placeholder:text-slate-300"
                    :disabled="isChatting"
                />
                <button
                    @click="handleSend"
                    :disabled="!inputMessage.trim() || isChatting"
                    class="p-1.5 rounded-lg transition-all"
                    :class="inputMessage.trim() ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-300'"
                >
                    <Send class="w-3.5 h-3.5" />
                </button>
            </div>
            <div class="mt-3 flex items-center justify-between">
                <button @click="clearChat" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors">
                    <Trash2 class="w-3 h-3" />
                    {{ t('chat.clear') }}
                </button>
                <div v-if="isChatting" class="flex items-center gap-1.5">
                    <Sparkles class="w-3 h-3 text-orange-400 animate-ai-glow" />
                    <span class="text-[9px] font-black uppercase tracking-widest text-orange-400 animate-pulse">{{ t('common.loading') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-200 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    @apply bg-slate-300;
}

@keyframes ai-glow {
    0%,
    100% {
        opacity: 0.5;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.1);
    }
}
.animate-ai-glow {
    animation: ai-glow 2s ease-in-out infinite;
}
</style>

