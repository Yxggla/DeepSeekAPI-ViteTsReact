import axios from "axios";
import { getToken } from "./AuthService.tsx"

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
