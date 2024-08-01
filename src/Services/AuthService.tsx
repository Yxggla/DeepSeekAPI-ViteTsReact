// src/services/AuthService.tsx
import axios from 'axios';
import { UserRegister, LoginFormValues } from '../types/Types.tsx'


//注册
export const register = async (user: UserRegister) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_Backend_API_URL}/register`, user);
        return response;
    } catch (error) {
        throw new Error(error.response?.data || '注册失败');
    }
};

//登陆
export const login = async (values: LoginFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_Backend_API_URL}/login`, values);
        const { token } = response.data;
        // 存储令牌
        sessionStorage.setItem('token', token);
        console.log(response.data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data || '登录失败');
    }
};

// 获取存储的token
export const getToken = () => {
    return sessionStorage.getItem('token');
};

// 清除存储的token
export const logoutToken = () => {
    sessionStorage.removeItem('token');
};


