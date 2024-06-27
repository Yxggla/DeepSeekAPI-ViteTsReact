// ChatComponent.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import { callDeepSeekApi } from '../../Services/ApiCaller.tsx'; // 假设这里的路径是正确的

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 98%;
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
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
`;

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ content: string; role: 'user' | 'assistant' }[]>([]);

    const handleUserMessage = async (message: string) => {
        setMessages((prevMessages) => [
           ...prevMessages,
            { content: message, role: 'user' },
        ]);
        request(message)
    };

    const request= async (message: string) => {
        const token = 'sk-50b876eb404543409a295d667916663a'; //  API Token
        try {
            const response = await callDeepSeekApi({ token, inputValue: message });
            console.log(response);
            const assistantMessage = response.choices[0]?.message?.content;
            if (assistantMessage) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { content: assistantMessage, role: 'assistant' },
                ]);
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }
    }


    return (
        <Container>
            <ChatArea>
                <ChatDisplay messages={messages} />
            </ChatArea>
            <ChatInputContainer>
                <ChatInput onSubmit={handleUserMessage} />
            </ChatInputContainer>
        </Container>
    );
};

export default ChatComponent;
