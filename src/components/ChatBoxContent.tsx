import React from 'react';
import { Layout, theme } from 'antd';
import  ChatComponent from './ChatBox/ChatComponent.tsx'
const { Content } = Layout;

const AppContent: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                flex: 1,
                height:'100%',
                overflow: 'auto', // 自动出现滚动条
            }}
        >
           <ChatComponent />
        </Content>
    );
};

export default AppContent;
