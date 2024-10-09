

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


export interface SaveDataState {
    title: string;
    messages: Message[];
    responses: Message[];
    setMessageAndResponse: (message: Message, response: Message, title: string) => void; // 更新函数签名
    clearMessages: () => void;
}


export interface TtmState {
    isNew: boolean;
    messages: { content: string; role: string; id: string }[]; // 消息数组
    title: string; // 标题
    setMessages: (messages: { content: string; role: string; id: string }[]) => void; // 更新消息的函数
    addMessage: (message: Message) => void; // 添加单条消息
    setTitle: (title: string) => void; // 更新标题的函数
    setIsNew: (isNew: boolean) => void;
}