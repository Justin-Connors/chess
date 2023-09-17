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
  // selectedPiece state
  const [selectedPiece, setSelectedPiece] = useState(null);
  // selectedPiecePosition state
  const [selectedPiecePosition, setSelectedPiecePosition] = useState(null);
  // selectedPiecePossibleMoves state
  const [selectedPiecePossibleMoves, setSelectedPiecePossibleMoves] = useState(
    []
  );
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [capturablePieces, setCapturablePieces] = useState([]);

  // capturedPieces state
  const [capturedPieces, setCapturedPieces] = useState([]);
  // selected square state
  const [selectedSquare, setSelectedSquare] = useState(null);
  // check state
  const [check, setCheck] = useState(false);
  // checkmate state
  const [checkmate, setCheckmate] = useState(false);
  // stalemate state
  const [stalemate, setStalemate] = useState(false);
  // draw state
  const [draw, setDraw] = useState(false);
  // castling state
  const [castling, setCastling] = useState(false);
  // en passant state
  const [enPassant, setEnPassant] = useState(false);
  // promotion state
  const [promotion, setPromotion] = useState(false);
  // player turn state
  const [playerTurn, setPlayerTurn] = useState("white");
  // game status state
  const [gameStatus, setGameStatus] = useState("active");
  // game history state
  const [gameHistory, setGameHistory] = useState([]);

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

  //get pieces from state and assign to variables
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
      const isPossibleMove = possibleMoves.some(
        (move) => move.row === i && move.column === j
      );
      const isCapturablePiece = capturablePieces.some(
        (piece) => piece.row === i && piece.column === j
      );
      const squareClass = isPossibleMove
        ? "possible-move"
        : isCapturablePiece
        ? "capturable-piece"
        : squareColor;

      columns.push(
        <div
          key={`${i}-${j}`}
          className={`square ${squareClass}`}
          onClick={() => handleSquareClick(i, j)}
        >
          {chessboard[i][j]}
        </div>
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
    // const clickedRowLabel = rowLabels[row];
    // const clickedColumnLabel = columnLabels[column];
    // console.log(`Clicked on square: ${clickedColumnLabel} ${clickedRowLabel}`);
    // console.log(`row: ${row}, column: ${column}`);

    const clickedPiece = chessboard[row][column];

    if (selectedPiece) {
      const isPossibleMove = possibleMoves.some(
        (move) => move.row === row && move.column === column
      );
      const isCapturablePiece = capturablePieces.some(
        (piece) => piece.row === row && piece.column === column
      );

      if (isPossibleMove || isCapturablePiece) {
        // if the move is possible, move the piece and clear possible moves
        const newChessboard = [...chessboard];
        newChessboard[selectedSquare.row][selectedSquare.column] = "";
        newChessboard[row][column] = selectedPiece;
        setChessboard(newChessboard);
        setSelectedPiece(null);
        setSelectedSquare(null);
        setPossibleMoves([]);
        setCapturablePieces([]);
        setPlayerTurn(playerTurn === "white" ? "black" : "white");
      } else {
        // if move is not possible, deselect the piece
        setSelectedPiece(null);
        setSelectedSquare(null);
        setPossibleMoves([]);
        setCapturablePieces([]);
      }
    } else {
      // if no piece is selected, select the clicked piece and calculate possible moves
      setSelectedPiece(clickedPiece);
      setSelectedSquare({ row, column });
      calculatePossibleMoves(clickedPiece, row, column);
    }

    if (selectedPiece === pieces.white.pawn) {
      const forwardOne = chessboard[row - 1][column] === "";
      const forwardTwo = row === 6 && chessboard[row - 2][column] === "";
      const captureLeft =
        column > 0 &&
        chessboard[row - 1][column - 1].startsWith(
          "♟︎" || "♝" || "♞" || "♜" || "♛"
        );
      const captureRight =
        column < 7 &&
        chessboard[row - 1][column + 1].startsWith(
          "♟︎" || "♝" || "♞" || "♜" || "♛"
        );

      let possibleMoves = [];
      if (forwardOne) possibleMoves.push({ row: row - 1, column });
      if (forwardTwo) possibleMoves.push({ row: row - 2, column });
      if (captureLeft) possibleMoves.push({ row: row - 1, column: column - 1 });
      if (captureRight)
        possibleMoves.push({ row: row - 1, column: column + 1 });

      setSelectedPiecePossibleMoves(possibleMoves);
    }
    // need to add piece capture logic
    // need to add piece promotion logic
    // need to add checkmate logic
    // need to add stalemate logic
    // need to add draw logic
    // need to add castling logic
    // need to add en passant logic
  };

  const calculatePossibleMoves = (piece, row, column) => {
    let moves = [];
    let captures = [];

    // Calculate possible moves based on type of piece

    if (piece === pieces.white.pawn) {
      if (row > 0 && chessboard[row - 1][column] === "") {
        moves.push({ row: row - 1, column });
      }
      if (row === 6 && chessboard[row - 2][column] === "") {
        moves.push({ row: row - 2, column });
      }
      if (
        row > 0 &&
        column > 0 &&
        chessboard[row - 1][column - 1].startsWith(
          "♟︎" || "♝" || "♞" || "♜" || "♛"
        )
      ) {
        captures.push({ row: row - 1, column: column - 1 });
      }
      if (
        row > 0 &&
        column < 7 &&
        chessboard[row - 1][column + 1].startsWith(
          "♟︎" || "♝" || "♞" || "♜" || "♛"
        )
      ) {
        captures.push({ row: row - 1, column: column + 1 });
      }
    }

    setPossibleMoves(moves);
    setCapturablePieces(captures);
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
