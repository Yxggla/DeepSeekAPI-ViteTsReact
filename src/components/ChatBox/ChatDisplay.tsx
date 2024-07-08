// ChatDisplay.tsx
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {ChatDisplayProps} from '../../types/Types.tsx';
import {marked} from 'marked';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 允许父元素垂直滚动 */
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

const MessageContainer = styled.div`
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 15px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    line-height: 1.4;
`;

const AssistantMessage = styled.div`
    height: auto;
    align-self: flex-start;
    background-color: #f1f1f1;
    color: #333;
    padding: 8px 12px;
    border-radius: 15px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    //overflow-x: auto; /* 当内容超过宽度时显示x轴滚动条 */
    //white-space: nowrap;
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
    line-height: 1.5;
`;


const createMarkup = (content: string) => {
    return { __html: marked(content) };
};

const ChatDisplay: React.FC<ChatDisplayProps> = ({messages}) => {
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

