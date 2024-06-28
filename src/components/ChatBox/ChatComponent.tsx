// ChatComponent.tsx

import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import axios from 'axios';
import { callDeepSeekApi } from '../../Services/ApiCaller.tsx';
import { Message } from '../../types/Types.tsx';

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: #e0e0e0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%; 
    background-color: #f7f7f7;
`;

const ChatArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

const ChatInputContainer = styled.div`
    width: 100%;
`;


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

    const handleUserMessage = async (message:string) => {
        const userMessage: Message = { content: message, role: 'user', id: 'user-message-' + Date.now() };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        const token = 'sk-50b876eb404543409a295d667916663a'; // 请确保替换为实际的 API Token
        const assistantMessageId = 'assistant-message-' + Date.now();
        setActiveAssistantId(assistantMessageId);
        await callDeepSeekApi({
            token,
            inputValue: message,
            onMessage: handleReceivedMessage,
            onComplete: handleCompleteMessage,
        });
    };

    return (
        <OuterContainer>
            <Container>
                <ChatArea>
                    <ChatDisplay messages={messages}/>
                </ChatArea>
                <ChatInputContainer>
                    <ChatInput onSubmit={handleUserMessage}/>
                </ChatInputContainer>
            </Container>
        </OuterContainer>
    );
};

export default ChatComponent;
