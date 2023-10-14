import React from "react";
import Header from "./Components/header/Header";
import "./index.css";
import Main from "./Components/Main/Main";
import Context from "./Components/Context/Context";

function App() {
  return (
    <div>
      <Context>
        <Header />
        <Main />
      </Context>
    </div>
  );
}

export default App;
