import React, { useState } from "react";
import "./Chessboard.css";

function Chessboard({ playerColor = "white", rowL, columnL }) {
  // chess board initial state
  const [chessboard, setChessboard] = useState([
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ]);

  // 8 x 8 chessboard
  const rows = [];
  // row labels
  let rowLabels = ["8", "7", "6", "5", "4", "3", "2", "1"];
  // column labels
  let columnLabels = ["A", "B", "C", "D", "E", "F", "G", "H"];

  if (playerColor === "black") {
    rowLabels = rowLabels.reverse();
    columnLabels = columnLabels.reverse();
  }

  const pieces = {
    white: {
      king: "♔",
      queen: "♕",
      rook: "♖",
      bishop: "♗",
      knight: "♘",
      pawn: "♙",
    },
    black: {
      king: "♚",
      queen: "♛",
      rook: "♜",
      bishop: "♝",
      knight: "♞",
      pawn: "♟︎",
    },
  };

  // create chessboard with alternating colors using 2 for loops

  for (let i = 0; i < 8; i++) {
    const columns = [];
    for (let j = 0; j < 8; j++) {
      const squareColor = (i + j) % 2 === 0 ? "white" : "black";
      columns.push(
        <div
          key={`${i}-${j}`}
          className={`square ${squareColor}`}
          onClick={() => handleSquareClick(i, j)}
        ></div>
      );
    }
    rows.push(
      <React.Fragment key={i}>
        <div className="row-label">{rowLabels[i]}</div>
        {columns}
        <div className="row-label"></div>
      </React.Fragment>
    );
  }

  //handle square click
  const handleSquareClick = (row, column) => {
    const clickedRowLabel = rowLabels[row];
    const clickedColumnLabel = columnLabels[column];
    console.log(`Clicked on square: ${clickedColumnLabel} ${clickedRowLabel}`);
    // need to add piece movement logic
    // need to add piece selection logic
    // need to add piece capture logic
    // need to add piece promotion logic
    // need to add checkmate logic
    // need to add stalemate logic
    // need to add draw logic
    // need to add castling logic
    // need to add en passant logic
  };

  return (
    <div className="chessboard">
      <div></div>
      {columnLabels.map((label, index) => (
        <div></div>
      ))}
      <div></div>
      {rows}
      <div></div>
      {columnLabels.map((label, index) => (
        <div key={index} className="column-label">
          {label}
        </div>
      ))}
    </div>
  );
}

export default Chessboard;
