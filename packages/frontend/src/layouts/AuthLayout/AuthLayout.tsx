import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
import './AuthLayout.css';

export const AuthLayout = () => {
    return (
        <Layout className="auth__layout">
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};
