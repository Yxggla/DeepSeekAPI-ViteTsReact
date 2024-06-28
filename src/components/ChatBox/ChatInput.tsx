// ChatInput.tsx

import React, {useState} from 'react';
import {Input, Button} from 'antd';
import styled from 'styled-components';


const {TextArea} = Input;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    padding-bottom: 0px;
    background-color: #fff;
    border-top: 1px solid #ccc;
`;

const StyledTextArea = styled(TextArea)`
    flex: 1;
    margin: 10px;
    margin-bottom: 0px;
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
    height: 50px;
`;

const ChatInput: React.FC<{ onSubmit: (message: string) => void }> = ({onSubmit}) => {
    const [inputValue, setInputValue] = useState('');
    const [isComposing, setIsComposing] = useState(false);
    const handleSubmit = () => {
        if (inputValue.trim() !== ''&& !isComposing) {
            onSubmit(inputValue);
            setInputValue('');
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

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{display: 'flex', width: '100%'}}>
                <StyledTextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    placeholder="请输入消息..."
                    autoSize={{minRows: 1, maxRows: 8}} // 设置自动调整高度的行数范围
                />
                <SendButton type="primary" onClick={handleSubmit}>发送</SendButton>
            </form>
        </Container>
    );
};

export default ChatInput;



