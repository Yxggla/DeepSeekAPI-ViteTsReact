import create from 'zustand';
import { TtmState } from '../types/Types.tsx'

const TitleToMessageStore = create<TtmState>((set) => ({
    isNew: false,
    messages: [],
    title: '',
    setMessages: (messages) => set({ messages }), // 更新消息
    addMessage: (newMessage) => set((state) => ({
        messages: typeof newMessage === 'function' ? newMessage(state.messages) : [...state.messages, newMessage],
    })),
    setTitle: (title) => set({ title }), // 更新标题
    setIsNew: (isNew) => set({ isNew }), // 更新是否为新对话的函数
}));


export default TitleToMessageStore;
