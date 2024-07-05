import React from 'react';
import {Modal, Button, Form, Input, message} from 'antd';
import {LoginModalProps, LoginFormValues} from '../../types/Types.tsx'


const LoginModal: React.FC<LoginModalProps> = ({visible, onCancel, onLogin,}) => {
    const [form] = Form.useForm();

    const onFinish = async (values: LoginFormValues) => {
        try {
            await onLogin(values); // 这里调用传递进来的 handleLogin 函数
            form.resetFields();
        } catch (error) {
            console.error(error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        message.error('表单验证失败，请检查输入');
    };

    return (
        <Modal
            title="登录"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    登录
                </Button>,
            ]}
        >
            <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="手机号"
                    name="tel"
                    rules={[{required: true, message: '请输入手机号'},
                        {pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码'},]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {required: true, message: '请输入密码'},
                        {min: 6, message: '密码至少6个字符'},
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;
