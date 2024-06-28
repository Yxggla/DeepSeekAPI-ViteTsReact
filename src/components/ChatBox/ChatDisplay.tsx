// ChatDisplay.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    max-height: 100%;
`;

const Message = styled.div`
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 4px 0;
    max-width: 80%;
    word-wrap: break-word;
`;

const AssistantMessage = styled.div`
    align-self: flex-start;
    background-color: #f1f1f1;
    color: #333;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 4px 0;
    max-width: 80%;
    word-wrap: break-word;
`;

interface Message {
    content: string;
    role: 'user' | 'assistant';
}

interface ChatDisplayProps {
    messages: Message[];
}

const ChatDisplay: React.FC<{ messages: { content: string, role: 'user' | 'assistant' }[] }> = ({ messages }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.role}:</strong> {msg.content}
                </div>
            ))}
        </div>
    );
};

export default ChatDisplay;
