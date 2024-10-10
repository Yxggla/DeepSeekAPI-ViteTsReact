import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatDisplayProps } from '../../types/Types.tsx';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // 引入高亮样式
import saveDataStore from '../../store/saveDataStore.tsx'
import ApiCallerStore from '../../store/ApiCallerStore.tsx'
import { saveChats } from '../../Services/User.tsx'
import useTitleToMessageStore from '../../store/TitleToMessageStore';


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
    padding: 10px 16px;
    border-radius: 18px;
    margin: 8px 0;
    max-width: 80%;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    position: relative;
    line-height: 1.5;

    & pre {
        padding: 8px;
        border-radius: 12px;
        overflow-x: auto;
        background-color: #f4f4f4;
    }

    & code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        border-radius: 12px;
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

const renderer = new marked.Renderer();


renderer.code = ({ text, lang }) => {
    const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
    const highlightedCode = hljs.highlight(validLanguage, text || '').value; // 修改此行
    return `<pre>
      <code class="hljs ${validLanguage}">${highlightedCode}</code>
    </pre>`;
};

marked.setOptions({ renderer });


const createMarkup = (content: string) => {
    // 检查 content 是否有效
    if (!content) {
        return { __html: '' }; // 或者根据需要返回其他内容
    }
    const sanitizedContent = DOMPurify.sanitize(marked(content));
    return { __html: sanitizedContent };
};

const ChatDisplay: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const Loading = ApiCallerStore(state => state.loading);
    const messages = useTitleToMessageStore(state => state.messages);
    const titles = useTitleToMessageStore(state => state.title);
    const isNew = useTitleToMessageStore(state => state.isNew);
    const setIsNew = useTitleToMessageStore((state) => state.setIsNew);
    const setIsSave = useTitleToMessageStore((state) => state.setIsSave);
    const isSave = useTitleToMessageStore((state) => state.isSave);
    const setIsFirstsend = useTitleToMessageStore((state) => state.setIsFirstsend);
    const saveChatsInformation = async (title: string, firstMessage: string, lastMessage: string) => {
        try {
            await saveChats(title, firstMessage, lastMessage);
        } catch (error) {
            console.error("保存聊天信息时出错:", error);
        }
    };

    useEffect(() => {
        if (messages.length > 1 && !Loading && isSave) { // 确保有足够的消息
            const firstMessage = messages[messages.length - 2];
            const lastMessage = messages[messages.length - 1];
            const title = isNew
                ? firstMessage.content.substring(0, 8) // 如果是新对话
                : titles; // 如果不是新对话
            if (title !== '') { // 使用严格比较
                saveChatsInformation(title, firstMessage.content, lastMessage.content);
            }
            console.log('是isNewm吗', isNew)
            if (isNew) {
                setIsNew(false);
                setIsFirstsend(true);
            }
            else {
                setIsFirstsend(false);
            }
            setIsSave(false)
        }
    }, [messages, Loading, isNew, titles, isSave, setIsFirstsend, setIsNew, setIsSave]); // 确保所有依赖项都在这里加 isNew 和 titles 作为依赖项ng 作为依赖项

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        hljs.highlightAll();
    }, []);
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