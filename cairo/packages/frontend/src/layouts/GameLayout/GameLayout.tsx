import { Layout, Menu } from 'antd';
import React from 'react';
import { MenuItems } from '../../constants/MenuItems';
import { Outlet, useLocation } from 'react-router-dom';
import { Content, GameLayoutContainer } from './GameLayout.styles';

const { Footer, Header } = Layout;

export const GameLayout = () => {
    const location = useLocation();

    return (
        <GameLayoutContainer>
            <Header className="header">
                <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={[location.pathname]} items={MenuItems} />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Cairo Game</Footer>
        </GameLayoutContainer>
    );
};
