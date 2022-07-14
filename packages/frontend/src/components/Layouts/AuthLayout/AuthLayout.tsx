import {Layout} from "antd";
import React from "react";
const { Content} = Layout;
import './AuthLayout.css'

interface IAuthLayout{
    children: React.ReactNode
}
export const AuthLayout = (props: IAuthLayout) => {
    return (
        <Layout className="auth__layout">
            <Content>
                {props.children}
            </Content>
        </Layout>
    )
 }