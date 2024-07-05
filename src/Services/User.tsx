import axios from "axios";
const API_URL = 'http://localhost:3010'; // 你的后端API地址
import {getToken} from "./AuthService.tsx"

export const getUserInformation = async () => {
    try {
        const token=getToken()
        const response = await axios.get(`${API_URL}/api/user`, {
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
