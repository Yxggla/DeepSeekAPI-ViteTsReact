import create from 'zustand';
import { TtmState } from '../types/Types.tsx'

const TitleToMessageStore = create<TtmState>((set) => ({
    isEmpty: false,//判断标题列表是否是空的
    isSave: false,//在保存数据的时候总会保存message的最后两条，所以在没有发对话的时候，是不需要保存最后两条信息的。
    isFirstsend: false,
    isNew: true,
    messages: [],
    title: '',
    setMessages: (messages) => set({ messages }), // 更新消息
    addMessage: (newMessage) => set((state) => ({
        messages: typeof newMessage === 'function' ? newMessage(state.messages) : [...state.messages, newMessage],
    })),
    setTitle: (title) => set({ title }), // 更新标题
    setIsNew: (isNew) => set({ isNew }), // 更新是否为新对话的函数
    setIsSave: (isSave) => set({ isSave }), // 更新是否为新对话的函数
    setIsFirstsend: (isFirstsend) => set({ isFirstsend }),
    setIsEmpty: (isEmpty) => set({ isEmpty }),
}));


export default TitleToMessageStore;
