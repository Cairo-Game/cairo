import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { MenuItems } from 'constants/MenuItems';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = Object.keys(MenuItems).map((key) => ({
    key,
    label: MenuItems[key],
}));

export const MainLayout = () => (
    <Layout className="main__layout">
        <Header className="header">
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={[Object.keys(MenuItems)[0]]} items={items} />
        </Header>
        <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Cairo Game</Footer>
    </Layout>
);
