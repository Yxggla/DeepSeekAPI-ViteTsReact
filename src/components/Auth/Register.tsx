import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { RegisterModalProps } from '../../types/Types';
import { register } from '../../Services/AuthService.tsx';

const RegisterModal: React.FC<RegisterModalProps> = ({ visible, onCancel, onRegister }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            await register(values);
            message.success('注册成功');
            form.resetFields();
            onRegister(); // 可能用于关闭模态框或其他逻辑
        } catch (error: any) {
            message.error(error.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('表单验证失败，请检查输入');
    };

    return (
        <Modal
            title="注册"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    注册
                </Button>,
            ]}
        >
            <Form
                form={form}
                name="register"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 3, message: '用户名至少3个字符' },
                        { max: 20, message: '用户名最多20个字符' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="电话"
                    name="tel"
                    rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码' },
                        { min: 6, message: '密码至少6个字符' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegisterModal;
