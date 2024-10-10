import { useState } from "react";
import { message } from "antd";
import { login, logoutToken } from "../Services/AuthService.tsx";
import { getUserInformation } from "../Services/User.tsx";
import { LoginFormValues, UserInformation } from "../types/Types.tsx";
import useAuthStore from "../store/useAuthStore.tsx";
import TitleToMessageStore from "../store/TitleToMessageStore.tsx";

const useAuthModal = () => {
  const setMessages = TitleToMessageStore((state) => state.setMessages);
  const { setUserInformation, logout, isLoggedIn } = useAuthStore();
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

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
      message.success("登录成功");
      handleLoginModalCancel();
      await fetchUserInformation();
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchUserInformation = async () => {
    try {
      const userData: UserInformation = await getUserInformation();
      setUserInformation(userData);
    } catch (error) {
      message.error("获取用户信息失败");
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    logoutToken();
    logout();
    message.success("已登出");
    setMessages([]);
  };

  return {
    isLoginModalVisible,
    isRegisterModalVisible,
    showLoginModal,
    handleLoginModalCancel,
    showRegisterModal,
    handleRegisterModalCancel,
    handleLogin,
    handleLogout,
  };
};
export default useAuthModal;
