// ChatDisplay.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatDisplayProps } from '../../types/Types.tsx';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 允许父元素垂直滚动 */
    padding: 20px 50px 30px 50px;
    background-color: #f9f9f9;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
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

const MessageContainer = styled.div`
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 12px 16px;
    border-radius: 18px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 1.4;
    position: relative;

     &::after {
        content: '';
        position: absolute;
        right: -8px;
        top: 10px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent transparent #007bff;
    }
`;

const AssistantMessage = styled.div`
    height: auto;
    align-self: flex-start;
    background-color: #fff;
    color: #333;
    padding: 12px 16px;
    border-radius: 18px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    position: relative;
    line-height: 1.5;

    & pre {
        margin: 8px 0;
        padding: 12px;
        background-color: #f4f4f4;
        border-radius: 12px;
        overflow-x: auto;
    }

    & code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px
    }

    & blockquote {
        border-left: 4px solid #ddd;
        padding-left: 16px;
        margin: 8px 0;
        color: #666;
    }

    & img {
        max-width: 100%;
        height: auto;
        margin: 8px 0;
    }

    & table {
        border-collapse: collapse;
        width: 100%;
        margin: 8px 0;
    }

    & th, & td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    & th {
        background-color: #f4f4f4;
    }

    /* 自定义滚动条 */
    &::-webkit-scrollbar {
        height: 8px;
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

    /* 覆盖默认的margin */
    p {
        margin: 8px 0;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 16px 0 8px 0;
    }
    ul, ol {
        margin: 8px 0;
        padding-left: 20px;
    }

    &::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 10px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
    }
`;

const createMarkup = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(marked(content));
    return { __html: sanitizedContent };
};

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <Container ref={containerRef}>
            {messages.map((msg, index) => (
                msg.role === 'user' ? (
                    <MessageContainer key={index}>{msg.content}</MessageContainer>
                ) : (
                    <AssistantMessage key={index} dangerouslySetInnerHTML={createMarkup(msg.content)} />
                )
            ))}
        </Container>
    );
};
export default ChatDisplay;
