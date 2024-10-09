import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { getTitles } from '../Services/User';
import useAuthStore from '../store/store'; // 引入 useAuthStore

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>([]);
    const { isLoggedIn } = useAuthStore(); // 获取登录状态

    useEffect(() => {
        const fetchTitles = async () => {
            if (isLoggedIn) {
                try {
                    const response = await getTitles();
                    const titles = response; // 获取 API 返回的数据
                    const items = titles.map((item, index) => ({
                        key: String(index + 1), // 确保每个 key 唯一
                        label: item.title, // 直接使用返回的 title
                    }));
                    setMenuItems(items);
                } catch (error) {
                    console.error("获取标题失败:", error);
                }
            } else {
                // 用户未登录时显示“添加新内容”
                setMenuItems([{ key: '1', label: '添加新内容' }]);
            }
        };

        fetchTitles();
    }, [isLoggedIn]); // 依赖于 isLoggedIn

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;
