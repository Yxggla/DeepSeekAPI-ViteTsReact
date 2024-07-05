// ChatDisplay.tsx
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Message ,ChatDisplayProps} from '../../types/Types.tsx';

const Container = styled.div` flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    max-height: 100%;
    /* 自定义滚动条 */

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #B5B5B5;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #909090;
    }
`;

const MessageContainer = styled.div` align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 15px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 1.4; `;
const AssistantMessage = styled.div` align-self: flex-start;
    background-color: #f1f1f1;
    color: #333;
    padding: 8px 12px;
    border-radius: 15px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 1.5; `;


const ChatDisplay: React.FC<ChatDisplayProps> = ({messages}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);
    return (<Container ref={containerRef}> {messages.map((msg, index) => (msg.role === 'user' ? (
        <MessageContainer key={index}>{msg.content}</MessageContainer>) : (
        <AssistantMessage key={index}>{msg.content}</AssistantMessage>)))} </Container>);
};
export default ChatDisplay;
