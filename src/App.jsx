import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import About from "./components/About";
import "./App.css";

const App = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="App">
      <Header showInfo={handleShowInfo} />
      <GameBoard />
      {showInfo && <About onClose={handleCloseInfo} />}
    </div>
  );
};

export default App;
