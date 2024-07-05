import React, { useState,useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme,message } from 'antd';
import LoginModal from './Auth/Login.tsx';
import RegisterModal from './Auth/Register.tsx';
import {HeaderProps,LoginFormValues,UserInformation} from '../types/Types.tsx'
import {getUserInformation} from '../Services/User.tsx';
import {login,getToken,logoutToken} from '../Services/AuthService.tsx';
import useAuthStore from '../store/store';
const { Header } = Layout;


const AppHeader: React.FC<HeaderProps> = ({ collapsed, toggleCollapse }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { isLoggedIn, userInformation, setUserInformation, logout } = useAuthStore();

    useEffect(() => {
        const token = getToken();//刷新的时候如果是有Token的那么就实现fetchUser函数
        if (token) {
            fetchUserInformation();
        }
    }, []);

    //刷新的时候用的，有token的话再获取一次用户信息
    const fetchUserInformation = async () => {
        try {
            const userData: UserInformation = await getUserInformation(); // 调用获取用户信息的API
            setUserInformation(userData);
        } catch (error) {
            message.error('获取用户信息失败');
            console.error(error.message);
        }
    };

    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

    const showLoginModal = () => {
        setLoginModalVisible(true);
    };

    const handleLoginModalCancel = () => {
        setLoginModalVisible(false);
    };

    const showRegisterModal = () => {
        setRegisterModalVisible(true);
    };

    const handleRegisterModalCancel = () => {
        setRegisterModalVisible(false);
    };

    //首次要登陆点击登陆键后，处理的函数
    const handleLogin = async (values: LoginFormValues) => {
        try {
            await login(values);
            message.success('登录成功');
            handleLoginModalCancel();
            await fetchUserInformation();
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleLogout = () => {
        logoutToken();
        logout();
        message.success('已登出');
    };

    return (
        <Header style={{padding: 0, background: colorBgContainer, width: '100%'}}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={toggleCollapse}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <span style={{fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#1890ff', fontSize: '18px'}}>
                DeepSeek GPT
            </span>
            <div style={{float: 'right', marginRight: '30px'}}>
                {isLoggedIn && userInformation ? (
                    <>
                        <span style={{ fontFamily: 'Arial, sans-serif', color: '#1890ff', fontSize: '20px', marginRight: '20px' }}>
                            欢迎, {userInformation.username}
                        </span>
                        <Button type="primary" ghost onClick={handleLogout} style={{marginRight: '8px'}}>
                            登出
                        </Button>
                    </>

                ) : (
                    <>
                        <Button type="primary" style={{marginRight: '12px'}} onClick={showLoginModal}>
                            登录
                        </Button>
                        <Button type="primary" ghost onClick={showRegisterModal} style={{marginRight: '8px'}}>
                            注册
                        </Button>
                    </>
                )}
            </div>

            <LoginModal
                visible={isLoginModalVisible}
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
