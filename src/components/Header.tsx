import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import LoginModal from './Auth/Login.tsx';
import RegisterModal from './Auth/Register.tsx';
import { HeaderProps } from '../types/Types.tsx';
import useAuthStore from '../store/store';
import useAuthModal from '../hooks/useAuthModal.ts';
const { Header } = Layout;


const AppHeader: React.FC<HeaderProps> = ({ collapsed, toggleCollapse }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { isLoggedIn, userInformation } = useAuthStore();
    const {
        isLoginModalVisible,
        isRegisterModalVisible,
        showLoginModal,
        handleLoginModalCancel,
        showRegisterModal,
        handleRegisterModalCancel,
        handleLogin,
        handleLogout,
    } = useAuthModal();

    return (
        <Header style={{ padding: 0, background: colorBgContainer, width: '100%' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapse}
                style={{
                    width: 68,
                    height: 68,
                }}
            />
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#1890ff', fontSize: '20px' }}>
                DeepSeek GPT
            </span>
            <div style={{ float: 'right', marginRight: '30px' }}>
                {isLoggedIn && userInformation ? (
                    <>
                        <span className='text-violet-500 text-[2.2rem] mr-10'>
                            欢迎, {userInformation.username}
                        </span>
                        <Button type="primary" ghost onClick={handleLogout} className="mr-4 text-[1.6rem]">
                            登出
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="primary" className="mr-8 text-[1.6rem]" onClick={showLoginModal}>
                            登录
                        </Button>
                        <Button type="primary" ghost onClick={showRegisterModal} className="mr-4 text-[1.6rem]">
                            注册
                        </Button>
                    </>
                )}
            </div>


            <LoginModal
                visible={isLoginModalVisible}
                key={Date.now()}
                onCancel={handleLoginModalCancel}
                onLogin={handleLogin}
            />

            <RegisterModal
                visible={isRegisterModalVisible}
                onCancel={handleRegisterModalCancel}
                onRegister={values => {
                    console.log(values);
                    handleRegisterModalCancel();
                }}
            />
        </Header>
    );
};

export default AppHeader;
