import React, { Component } from "react";
import { Separator } from "./components/Separator/separator";
import { colorBlack } from "./styles/modules/colors";
import Cat from "./assets/svg/cat.svg";
import "./App.css";
import "./styles/common/normalize.css";
import { Home } from "./pages/Home/home";

class App extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Cairo Game</h1>
        <Cat width={200} />
        <Separator color={colorBlack} />
        <Home />
      </div>
    );
  }
}

export default App;
