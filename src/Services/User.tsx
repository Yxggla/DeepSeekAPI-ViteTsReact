import axios from "axios";
import { getToken } from "./AuthService.tsx"


//获取用户信息
export const getUserInformation = async () => {
    try {
        const token = getToken()
        const response = await axios.get(`${import.meta.env.VITE_Backend_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || '获取用户信息失败');
    }
};


//获取标题们 没试过
export const getTitles = async () => {
    try {
        const token = getToken()
        const response = await axios.get(`${import.meta.env.VITE_Backend_API_URL}/titles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || '获取标题失败');
    }
};

//点击标题获取对应数据
export const getChats = async (title: string) => {
    try {
        const token = getToken()
        const response = await axios.get(`${import.meta.env.VITE_Backend_API_URL}/chats`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                title: title // 将 title 作为查询参数传递
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || '获取标题对应的聊天记录们失败');
    }
};

//每次的对应一组的数据存储
export const saveChats = async (title: string, message: string, response: string) => {
    try {
        const token = getToken()
        const responsed = await axios.post(`${import.meta.env.VITE_Backend_API_URL}/saveChats`, {
            title: title,
            message: message,
            response: response
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        console.log(responsed.data)
        return responsed.data;
    } catch (error) {
        throw new Error(error.response?.data || '保存聊天记录们失败');
    }
};