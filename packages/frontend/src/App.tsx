import React, { Component } from "react";
import { Separator } from "./components/Separator/separator";
import { colorBlack } from "./styles/modules/colors";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Cairo Game</h1>
        <Separator color={colorBlack} />
      </div>
    );
  }
}

export default App;
