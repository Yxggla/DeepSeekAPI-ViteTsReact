// ChatComponent.tsx

import React, { useState } from 'react';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { callDeepSeekApi } from '../../Services/ApiCaller.tsx';
import { Message } from '../../types/Types.tsx';




//上面信息为css

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);

    // 处理从 API 返回的单个消息片段
    const handleReceivedMessage = (message: Message) => {
        setMessages((prevMessages) => {
            const existingMessageIndex = prevMessages.findIndex(msg => msg.id === message.id);

            if (existingMessageIndex !== -1) {
                const updatedMessages = [...prevMessages];
                updatedMessages[existingMessageIndex] = message;
                return updatedMessages;
            } else {
                return [...prevMessages, message];
            }
        });
    };

    // 处理 API 完成后返回的完整消息
    const handleCompleteMessage = (messageId: { id: string }) => {
        setActiveAssistantId(null);
    };

    const handleUserMessage = async (message: string) => {
        const userMessage: Message = { content: message, role: 'user', id: 'user-message-' + Date.now() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        const assistantMessageId = 'assistant-message-' + Date.now();
        setActiveAssistantId(assistantMessageId);
        await callDeepSeekApi({
            inputValue: message,
            onMessage: handleReceivedMessage,
            onComplete: handleCompleteMessage,
        });
    };

    return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gray-200">
            <div className="flex flex-col w-full h-full bg-gray-100">
                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                    <ChatDisplay messages={messages} />
                </div>
                <div className="w-full">
                    <ChatInput onSubmit={handleUserMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
