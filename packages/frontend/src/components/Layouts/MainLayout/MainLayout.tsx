import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import {MenuItems} from "constants/MenuItems";
import './MainLayout.css'

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = Object.keys(MenuItems).map(key => ({
    key,
    label: MenuItems[key],
}));


interface IMainLayout{
    children: React.ReactNode
}

const MainLayout = (props: IMainLayout) => (
    <Layout className="main__layout">
        <Header className="header">
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={[Object.keys(MenuItems)[0]]} items={items} />
        </Header>
        <Content style={{ display:"flex", flexDirection:'column', justifyContent:'center'}}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Cairo Game</Footer>
    </Layout>
);

export default MainLayout;