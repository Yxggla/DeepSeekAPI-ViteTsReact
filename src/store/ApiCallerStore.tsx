import create from 'zustand';
import { AppState } from '../types/Types.tsx'

const ApiCallerStore = create<AppState>((set) => ({
    loading: false, //等待(流式传输)的时候是为true,
    controller: new AbortController(),
    setLoading: (loading: boolean) => set({ loading }),
    setController: (controller: AbortController) => set({ controller }),
}));


export default ApiCallerStore;
