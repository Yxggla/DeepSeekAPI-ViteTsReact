

//Message定义
export interface Message {
    content: string;
    role: 'user' | 'assistant';
    id: string | null;
}

export interface ChatDisplayProps {
    messages: Message[];
}

export interface LoginModalProps {
    visible: boolean;
    onCancel: () => void;
    onLogin: (values: { username: string; password: string }) => void;
}

export interface RegisterModalProps {
    visible: boolean;
    onCancel: () => void;
    onRegister: (values: { username: string; password: string }) => void;
}

export interface HeaderProps {
    collapsed: boolean;
    toggleCollapse: () => void;
}


export interface UserRegister {
    username: string;
    tel: string;
    password: string;
}

export interface LoginFormValues {
    username: string;
    password: string;
}

export interface UserInformation {
    username: string;
    tel: string;
    conversations: any[];
}

export interface AuthState {
    isLoggedIn: boolean;
    userInformation: UserInformation | null;
    setUser: (userInformation: UserInformation) => void;
    logout: () => void;
}

export interface ApiConfig {
    token: string;
    inputValue: string;
    onMessage: (message: Message) => void;
    onComplete: (messageId: { id: string }) => void;
}

export interface AppState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}
