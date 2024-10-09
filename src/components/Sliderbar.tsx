import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { getTitles, getChats } from '../Services/User';
import useAuthStore from '../store/store'; // 引入 useAuthStore
import useTitleToMessageStore from '../store/TitleToMessageStore';
const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setMessages: (messages: any[]) => void; // 用于更新 ChatDisplay 的消息
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const setMessages = useTitleToMessageStore((state) => state.setMessages);
    const setTitle = useTitleToMessageStore((state) => state.setTitle);
    const setIsNew = useTitleToMessageStore((state) => state.setIsNew);
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
            }
        };

        fetchTitles();
    }, [isLoggedIn]);

    const handleNewConversation = () => {
        setMessages([]); // 清空消息
        setTitle(''); // 可选：清空标题
        setIsNew(true)
    };

    const handleMenuClick = async (label: string) => {
        if (isLoggedIn) {
            try {
                const chatsResponse = await getChats(label); // 将 label 传递给 getChats
                const messages = chatsResponse.flatMap((chat: any) => [
                    {
                        content: chat.message,
                        role: 'user',
                    },
                    {
                        content: chat.response,
                        role: 'assistant',
                    }
                ]);
                setTitle(label)
                setMessages(messages);
            } catch (error) {
                console.error("获取聊天记录失败:", error);
            }
        }
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems.map(item => ({
                    ...item,
                    onClick: () => handleMenuClick(item.label), // 传递 label
                }))}
            />
            <div style={{ padding: '16px' }}>
                <Button type="primary" onClick={handleNewConversation} block>
                    创建新的对话
                </Button>
            </div>
        </Sider>
    );
};

export default Sidebar;
