// ChatComponent.tsx

import React, { useState } from 'react';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { callDeepSeekApi } from '../../Services/ApiCaller.tsx';
import { Message } from '../../types/Types.tsx';
import useTitleToMessageStore from '../../store/TitleToMessageStore';



const ChatComponent: React.FC = () => {
    // const [messages, setMessages] = useState<Message[]>([]);
    const messages = useTitleToMessageStore(state => state.messages);
    const addMessage = useTitleToMessageStore((state) => state.addMessage); // 获取 setMessages 方法
    const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);

    // 处理从 API 返回的单个消息片段
    const handleReceivedMessage = (message: Message) => {
        addMessage((prevMessages) => {
            const existingMessageIndex = prevMessages.findIndex(msg => msg.id === message.id);

            if (existingMessageIndex !== -1) {
                const updatedMessages = [...prevMessages];
                updatedMessages[existingMessageIndex] = message;
                return updatedMessages; // 更新现有消息
            } else {
                return [...prevMessages, message]; // 添加新消息
            }
        });
    };

    // 处理 API 完成后返回的完整消息
    const handleCompleteMessage = async (messageId: { id: string }) => {
        setActiveAssistantId(null);
    };

    const handleUserMessage = async (inputMessage: string) => {
        const userMessage: Message = { content: inputMessage, role: 'user', id: 'user-message-' + Date.now() };
        addMessage((prevMessages) => [...prevMessages, userMessage]); // 确保使用 prevMessages
        const assistantMessageId = 'assistant-message-' + Date.now();
        setActiveAssistantId(assistantMessageId);
        await callDeepSeekApi({
            inputValue: inputMessage,
            onMessage: handleReceivedMessage,
            onComplete: handleCompleteMessage,
        });
    };



    return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-gray-200">
            <div className="flex flex-col w-full h-full bg-gray-100">
                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                    <ChatDisplay />
                </div>
                <div className="w-full">
                    <ChatInput onSubmit={handleUserMessage} />
                </div>
            </div>

        </div>
    );
};

export default ChatComponent;
