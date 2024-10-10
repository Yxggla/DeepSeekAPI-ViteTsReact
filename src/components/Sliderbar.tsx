import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, message as antdMessage } from 'antd';
import { getTitles, getChats } from '../Services/User';
import useAuthStore from '../store/useAuthStore.tsx'; // 引入 useAuthStore
import useTitleToMessageStore from '../store/TitleToMessageStore';
import useAuthModal from '../hooks/useAuthModal.ts';
import LoginModal from './Auth/Login.tsx';
const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setMessages: (messages: any[]) => void; // 用于更新 ChatDisplay 的消息
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const setMessages = useTitleToMessageStore((state) => state.setMessages);
    const setTitle = useTitleToMessageStore((state) => state.setTitle);
    const setIsNew = useTitleToMessageStore((state) => state.setIsNew);
    const setIsEmpty = useTitleToMessageStore((state) => state.setIsEmpty);
    const isFirstsend = useTitleToMessageStore((state) => state.isFirstsend);
    const isNew = useTitleToMessageStore((state) => state.isNew);
    // const isSave = useTitleToMessageStore((state) => state.isSave);
    const [menuItems, setMenuItems] = useState<{ key: string; label: string }[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>('');
    const { isLoggedIn } = useAuthStore(); // 获取登录状态
    const {
        isLoginModalVisible,
        showLoginModal,
        handleLoginModalCancel,
        handleLogin,
    } = useAuthModal();

    useEffect(() => {
        const fetchTitles = async () => {
            if (isLoggedIn) {
                try {
                    const response = await getTitles();
                    const titles = response; // 获取 API 返回的数据
                    const items = titles.map((item, index: number) => ({
                        key: String(index + 1), // 确保每个 key 唯一
                        label: item.title, // 直接使用返回的 title
                    }));
                    setMenuItems(items);
                    if (isFirstsend) {
                        setSelectedKey(items.length.toString()); // 选中最后一个对话

                    }
                    // else {
                    //     setIsEmpty(true)
                    // }
                } catch (error) {
                    console.error("获取标题失败:", error);
                }
            } else {
                setMenuItems([]); // 清空菜单项
            }
        };
        fetchTitles();
    }, [isLoggedIn, isFirstsend, isNew, setIsEmpty]);

    const handleNewConversation = () => {
        if (isLoggedIn) {
            setMessages([]); // 清空消息
            setTitle(''); // 可选：清空标题
            setIsNew(true);
            setSelectedKey('');
        }
        else {
            antdMessage.warning('请先登录');
            showLoginModal();
        }
    };

    const handleMenuClick = async (label: string, key: string) => {
        if (isLoggedIn) {
            if (selectedKey === key) {
                return;
            }
            try {
                setMessages([]);
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
                setTitle(label);
                setMessages(messages);
                setIsNew(false);
                setSelectedKey(key);
                console.log('selectedKey', selectedKey)
            } catch (error) {
                console.error("获取聊天记录失败:", error);
            }
        }
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[]}
                selectedKeys={[selectedKey]}
                items={menuItems.map(item => ({
                    ...item,
                    onClick: () => handleMenuClick(item.label, item.key), // 传递 label
                }))}
            />
            <div style={{ padding: '16px' }}>
                <Button type="primary" onClick={handleNewConversation} block>
                    创建新的对话
                </Button>
            </div>
            <LoginModal
                visible={isLoginModalVisible}
                key={Date.now()}
                onCancel={handleLoginModalCancel}
                onLogin={handleLogin}
            />
        </Sider>
    );
};

export default Sidebar;
