import { Layout, Menu } from 'antd';
import React from 'react';
import { MenuItems } from 'constants/MenuItems';
import { Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

export const MainLayout = () => {
    const location = useLocation();

    return (
        <Layout className="main__layout">
            <Header className="header">
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={[location.pathname]} items={MenuItems} />
            </Header>
            <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Cairo Game</Footer>
        </Layout>
    );
};
