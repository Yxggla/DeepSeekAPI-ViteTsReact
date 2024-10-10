// ChatInput.tsx

import React, { useState } from 'react';
import { Input, Button, message as antdMessage } from 'antd';
import styled from 'styled-components';
import ApiCallerStore from "../../store/ApiCallerStore.tsx";
import useAuthStore from '../../store/useAuthStore.tsx'; // 引入 useAuthStore
import LoginModal from '../Auth/Login.tsx';
import useAuthModal from '../../hooks/useAuthModal.ts';
import TitleToMessageStore from '../../store/TitleToMessageStore.tsx'

const { TextArea } = Input;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    padding-bottom: 0px;
    background-color: #fff;
    border-top: 1px solid #ccc;
`;

const StyledTextArea = styled(TextArea)`
    flex: 1;
    margin: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
    resize: none;
    overflow: auto;
    padding: 10px;
    font-size: 16px;
    height: 50px;
    background-color: #f5f5f5;
`;

const SendButton = styled(Button)`
    margin: 10px;
    margin-bottom: 0px;
    border-radius: 8px;
    font-size: 16px;
    height: 44px;
`;

const ChatInput: React.FC<{ onSubmit: (message: string) => void }> = ({ onSubmit }) => {
    const loading = ApiCallerStore(state => state.loading);
    const setLoading = ApiCallerStore(state => state.setLoading);
    const setIsSave = TitleToMessageStore((state) => state.setIsSave);
    const [inputValue, setInputValue] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const { isLoggedIn } = useAuthStore(); // 获取登录状态
    const {
        isLoginModalVisible,
        showLoginModal,
        handleLoginModalCancel,
        handleLogin,
    } = useAuthModal();


    const handleSubmit = () => {
        if (isLoggedIn) {
            if (inputValue.trim() !== '' && !isComposing) {
                setLoading(true);
                onSubmit(inputValue);
                setInputValue('');
                setIsSave(true)
            }
        } else {
            antdMessage.warning('请先登录');
            showLoginModal();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };
    const handleCompositionStart = () => {
        setIsComposing(true);
    };
    const handleCompositionEnd = () => {
        setIsComposing(false);
    };


    const handlePause = () => {
        if (isLoggedIn) {
            if (loading) {
                setLoading(false);
            } else {
                handleSubmit();
            }
        } else {
            antdMessage.warning('请先登录');
            showLoginModal();
        }
    };


    return (
        <Container>
            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
                <StyledTextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="请输入消息..."
                    autoSize={{ minRows: 1, maxRows: 8 }} // 设置自动调整高度的行数范围
                />
                <SendButton type="primary" onClick={handlePause}>
                    {loading ? '暂停' : '发送'}
                </SendButton>

            </form>
            <LoginModal
                visible={isLoginModalVisible}
                key={Date.now()}
                onCancel={handleLoginModalCancel}
                onLogin={handleLogin}
            />
        </Container>
    );
};

export default ChatInput;



