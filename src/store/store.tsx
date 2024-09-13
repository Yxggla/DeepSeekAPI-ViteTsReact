// store.ts
import create from 'zustand';
import { UserInformation, AuthState } from '../types/Types.tsx'

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    userInformation: null,
    setUserInformation: (userInformation: UserInformation) => set({
        isLoggedIn: true,
        userInformation,
    }),
    logout: () => set({ isLoggedIn: false, userInformation: null }),
}));

export default useAuthStore;
