import React, { Component } from "react";
import "./App.css";
import "./styles/common/normalize.css";
import {Link, Route, Routes} from "react-router-dom";
import {Layout, MenuProps} from "antd";
const { Content} = Layout;
import "antd/dist/antd.css";
import {Login} from "pages/Login/Login";
import {AuthLayout} from "components/Layouts/AuthLayout/AuthLayout";
import {SignUp} from "pages/SignUp/SignUp";
import {ProfileDescription} from "pages/ProfileDescription/ProfileDescription";
import {ProjectRoutes} from "constants/Routs";
import {ProfileSettings} from "pages/ProfileSettings/ProfileSettings";
import MainLayout from "components/Layouts/MainLayout/MainLayout";

class App extends Component {
  render() {
    return (
        <Routes>
            <Route path={ProjectRoutes.login} element={<AuthLayout><Login/></AuthLayout>}/>
            <Route path={ProjectRoutes.signUp} element={<AuthLayout><SignUp/></AuthLayout>}/>
            <Route path={ProjectRoutes.profileDescription} element={<MainLayout><ProfileDescription/></MainLayout>}/>
            <Route path={ProjectRoutes.profileSettings} element={<MainLayout><ProfileSettings/></MainLayout>}/>
        </Routes>
    );
  }
}

export default App;
