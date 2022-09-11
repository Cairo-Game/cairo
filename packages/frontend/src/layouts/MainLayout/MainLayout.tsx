import { Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { MenuItems } from '../../constants/MenuItems';
import { Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';
import { ThemeContext } from '../../context/ThemeContext';

const { Header, Content, Footer, Sider } = Layout;

export const MainLayout = () => {
    const location = useLocation();
    const theme = useContext(ThemeContext);
    return (
        <Layout className="main__layout">
            <Header className={`header ${theme.state.darkMode && 'header_dark'}`}>
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={[location.pathname]} items={MenuItems} />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Cairo Game</Footer>
        </Layout>
    );
};
