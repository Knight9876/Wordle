import React from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import "./App.css"; // Global styles

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameBoard />
    </div>
  );
};

export default App;
