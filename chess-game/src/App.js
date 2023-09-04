import React from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";

function App() {
  const rowL = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const columnL = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return (
    <div className="App">
      <Chessboard rowLabels={rowL} columnLabels={columnL} />
    </div>
  );
}

export default App;
