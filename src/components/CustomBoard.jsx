/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "./Modal";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// console.log(calculateWinner)

function CustomBoard() {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [inputSize, setInputSize] = useState("");
  const [size, setSize] = useState(3);

  //setInputSize
  const handleChange = (event) => {
    setInputSize(event.target.value);
  };

  //Board
  const [board, setBoard] = useState(Array(size * size).fill(null | 0));
  //Score
  const savedScores = JSON.parse(localStorage.getItem("ticTacToeScores"));
  const [scores, setScores] = useState(savedScores || { X: 0, O: 0 });

  const [showModal, setShowModal] = useState(false);
  const [xIsNext, setXIsNext] = useState(true);

  //handle when user click "Set Board" button❤
  const handleCustomBoard = () => {
    if (inputSize < 3) {
      return;
    } else {
      setSize(inputSize);
      setBoard(Array(size).fill(null));
      setXIsNext(true);
      setHistory([]);
    }
  };

  function calculateWinner(squares, boardSize) {
    const lines = [];

    // Generate winning combinations for rows
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - 3; col++) {
        lines.push([
          row * size + col,
          row * size + col + 1,
          row * size + col + 2,
        ]);
      }
    }

    // Generate winning combinations for columns
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - 3; row++) {
        lines.push([
          row * size + col,
          (row + 1) * size + col,
          (row + 2) * size + col,
        ]);
      }
    }

    // Generate winning combinations for diagonals (top-left to bottom-right)
    for (let row = 0; row <= size - 3; row++) {
      for (let col = 0; col <= size - 3; col++) {
        lines.push([
          row * size + col,
          (row + 1) * size + col + 1,
          (row + 2) * size + col + 2,
        ]);
      }
    }

    // Generate winning combinations for diagonals (bottom-left to top-right)
    for (let row = 2; row < size; row++) {
      for (let col = 0; col <= size - 3; col++) {
        lines.push([
          row * size + col,
          (row - 1) * size + col + 1,
          (row - 2) * size + col + 2,
        ]);
      }
    }
    console.log(lines);

    // Check for a winner in each line
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  // handle when user click Square
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board, size)) {
      return;
    }

    const newBoard = board.slice();

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    setHistory((history) => [
      ...history,
      {
        player: newBoard[index],
        move: index + 1,
      },
    ]);

    //check winner show Winner or Draw
    const winner = calculateWinner(newBoard, size);
    if (winner) {
      setShowModal(true);
      const newScores = { ...scores };
      newScores[winner] += 1;
      setScores(newScores);
      localStorage.setItem("ticTacToeScores", JSON.stringify(newScores));
    } else if (history.length + 1 === size * size) {
      setShowModal(true);
    }
  };

  // get winner
  const winner = calculateWinner(board, size);
  // status game
  const status = winner
    ? `Winner: ${winner}`
    : `Next player : "${xIsNext ? "X" : "O"}"`;

  //Square
  const renderSquare = (index) => (
    <button
      className={`square ${
        board[index] == "X" ? "X" : board[index] == "O" ? "O" : ""
      }`}
      onClick={() => handleClick(index)}
      key={index}
    >
      {board[index] ? board[index] : ""}
    </button>
  );

  //@Reset Board
  const handleReset = () => {
    setBoard(Array(size).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0 });
    setHistory([]);
    localStorage.removeItem("ticTacToeScores");
  };

  //New Game "Round -->>>"
  const handleNewGame = () => {
    setBoard(Array(size).fill(null));
    setXIsNext(true);
    setHistory([]);
  };

  //Close Modal Alert Winner Or Draw
  const closeModal = () => {
    handleNewGame();
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {showModal && (
        <Modal closeModal={closeModal} winner={winner ? winner : "Draw"} />
      )}
      <div className="status text-lg font-bold select-none text-white bg-slate-800 p-5 rounded-lg">
        {status}
      </div>
      <div className="flex justify-center select-none mb-2 gap-x-3 ">
        <p className=" p-3  border-b-2 border-red-800  text-red-800">
          X : <strong>{scores.X}</strong>
        </p>
        <p className=" p-3 border-b-2 border-green-800  text-green-800">
          O : <strong>{scores.O}</strong>
        </p>
      </div>

      <main className=" flex flex-col justify-center items-center">
        <div className=" container">
          <div className="board">
            {Array(size)
              .fill(null)
              .map((_, row) => (
                <div className="row" key={row}>
                  {Array(size)
                    .fill(null)
                    .map((_, col) => renderSquare(row * size + col))}
                </div>
              ))}
          </div>
          <div className=" flex gap-x-5  p-1 items-center text-xs md:text-base justify-center">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={inputSize}
                label="Size"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
            <button
              onClick={handleCustomBoard}
              className=" bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-700 hover:shadow-blue-400 shadow-md "
            >
              Set Board
            </button>
          </div>
        </div>
        <div className=" flex gap-x-2">
          <button
            className="p-2 mt-5 bg-slate-700 text-white rounded-md hover:bg-slate-200 hover:text-slate-700 
           transition-all duration-300"
            onClick={() => handleReset()}
          >
            Reset Game
          </button>
          <button
            className="p-2 mt-5 bg-slate-700 text-white rounded-md hover:bg-slate-200 hover:text-slate-700 
           transition-all duration-300"
            onClick={() => setShowHistory((showHistory) => !showHistory)}
          >
            History
          </button>
        </div>
      </main>
      {showHistory && (
        <div className="fixed right-2 z-20 top-48 bg-white">
          <p className=" font-bold select-none">History Board</p>
          <ul className="flex  flex-col overflow-y-scroll h-56 w-52 md:w-72 scroll shadow-md gap-y-2">
            {history.map((h, i) => (
              <ol
                key={i}
                className="flex gap-3 bg-slate-600 text-white items-center text-xs md:text-base border mx-2 p-2 "
              >
                <p>Turn : {i + 1}</p>
                <div className="flex gap-x-2">
                  <p>Player: {h?.player}</p>
                  <p>move: {h?.move}</p>
                </div>
              </ol>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomBoard;
