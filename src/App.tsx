import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sliderbar.tsx';
import AppHeader from './components/Header';
import AppContent from './components/ChatBoxContent.tsx';

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ height: '100vh' ,width:'100%'}}>
            <Sidebar collapsed={collapsed} />
            <Layout style={{ width: '100%' }}> {/* 确保子布局占满剩余宽度 */}
                <AppHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
                <AppContent />
            </Layout>
        </Layout>
    );
};

export default App;
