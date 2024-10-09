import React from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;
