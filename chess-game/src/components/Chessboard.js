import React from "react";
import "./Chessboard.css";

function Chessboard({ playerColor = "white", rowL, columnL }) {
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
