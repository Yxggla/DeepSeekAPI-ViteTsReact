import create from 'zustand';
import { Message, SaveDataState } from '../types/Types.tsx';

const saveDataStore = create<SaveDataState>((set) => ({
    messages: [],
    responses: [],
    title: '',
    setMessageAndResponse: (message: Message, response: Message, title: string) => {
        console.log('Setting message and response:', message, response, title);
        set({
            messages: [message],
            responses: [response],
            title: title
        });
    },
    clearMessages: () => set({ messages: [], responses: [] }),

}));


export default saveDataStore;