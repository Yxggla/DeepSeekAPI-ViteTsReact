// src/services/AuthService.tsx
import axios from 'axios';
import { UserRegister,LoginFormValues } from '../types/Types.tsx'
const API_URL = 'http://localhost:3010'; // 你的后端API地址


//注册
export const register = async (user: UserRegister) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, user);
        return response;
    } catch (error) {
        throw new Error(error.response?.data || '注册失败');
    }
};

//登陆
export const login = async (values: LoginFormValues) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, values);
        const { token,user } = response.data;
        // 存储令牌
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(response.data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data || '登录失败');
    }
};

// 获取存储的token
export const getToken = () => {
    return localStorage.getItem('token');
};

// 清除存储的token
export const logoutToken = () => {
    localStorage.removeItem('token');
};


