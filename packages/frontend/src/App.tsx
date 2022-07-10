import React, { Component } from "react";
import { Separator } from "components/Separator/separator";
import { colorBlack } from "styles/modules/colors";
import Cat from "./assets/svg/cat.svg";
import "./App.css";
import "./styles/common/normalize.css";
import { Home } from "pages/Home/home";
import {Link, Route, Routes} from "react-router-dom";
import {Layout, MenuProps} from "antd";
const { Content} = Layout;
import "antd/dist/antd.css";
import {Login} from "pages/Login/Login";
import {AuthLayout} from "components/Layouts/AuthLayout/AuthLayout";
import {SignUp} from "pages/SignUp/SignUp";

class App extends Component {
  render() {
    return (
        <Routes>
                    <Route path="/" element={<AuthLayout><Login/></AuthLayout>}/>
                    <Route path="/sign-up" element={<AuthLayout><SignUp/></AuthLayout>}/>
            </Routes>
    );
  }
}

export default App;
