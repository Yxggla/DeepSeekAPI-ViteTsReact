import create from 'zustand';
import {AppState} from '../types/Types.tsx'

const ApiCallerStore = create<AppState>((set) => ({
    loading: false,
    controller: new AbortController(),
    setLoading: (loading: boolean) => set({ loading }),
    setController: (controller: AbortController) => set({ controller }),
}));


export default ApiCallerStore;
