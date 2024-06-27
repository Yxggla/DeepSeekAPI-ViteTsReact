// ChatInput.tsx

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;
`;

const ChatInput: React.FC<{ onSubmit: (message: string) => void }> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
            onSubmit(inputValue);
            setInputValue('');
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="请输入消息..."
                    style={{ flex: 1, marginRight: 10 }}
                />
                <Button type="primary" htmlType="submit">发送</Button>
            </form>
        </Container>
    );
};

export default ChatInput;
