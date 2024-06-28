

//Message定义
export interface Message {
    content: string;
    role: 'user' | 'assistant';
    id: string | null;
}

export interface ChatDisplayProps {
    messages: Message[];
}

