/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Modal from "./Modal";
import HistoryBoard from "./HistoryBoard";
import SelectedPlayer from "./SelectedPlayer";
import Status from "./Status";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// console.log(calculateWinner)

function CustomBoard() {
  const [inputSize, setInputSize] = useState("");
  const [size, setSize] = useState(3);

  //Board
  const [board, setBoard] = useState(Array(size * size).fill(null));

  //=============================
  //Player default X
  //=============================
  const [xIsNext, setXIsNext] = useState(true);
  const [player, setPlayer] = useState("X");
  // console.log(xIsNext)
  const [showSelectPlayer, setShowSelectPlayer] = useState(true);

  //History
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [lineWin, setLineWin] = useState("");
  const [indexLine, setIndexLine] = useState([]);

  //Score
  const savedScores = JSON.parse(localStorage.getItem("ticTacToeScores"));
  const [scores, setScores] = useState(savedScores || { X: 0, O: 0 });

  const [showModal, setShowModal] = useState(false);

  //
  const handlePlayerFirst = (e) => {
    setPlayer(e.target.value);
    setShowSelectPlayer(false);
  };

  //setInputSize
  const handleChange = (event) => {
    setInputSize(event.target.value);
  };

  //handle when user click "Set Board" button❤
  const handleCustomBoard = () => {
    if (inputSize < 3) {
      return;
    } else {
      setSize(inputSize);
      setBoard(Array(size).fill(null));
      setHistory([]);
    }
  };

  function calculateWinner(squares, boardSize) {
    const lines = [];

    // Generate winning combinations for rows
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col <= boardSize - 3; col++) {
        lines.push([
          row * boardSize + col,
          row * boardSize + col + 1,
          row * boardSize + col + 2,
        ]);
      }
    }

    // Generate winning combinations for columns
    for (let col = 0; col < boardSize; col++) {
      for (let row = 0; row <= boardSize - 3; row++) {
        lines.push([
          row * boardSize + col,
          (row + 1) * boardSize + col,
          (row + 2) * boardSize + col,
        ]);
      }
    }

    // Generate winning combinations for diagonals (top-left to bottom-right)
    for (let row = 0; row <= boardSize - 3; row++) {
      for (let col = 0; col <= boardSize - 3; col++) {
        lines.push([
          row * boardSize + col,
          (row + 1) * boardSize + col + 1,
          (row + 2) * boardSize + col + 2,
        ]);
      }
    }

    // Generate winning combinations for diagonals (bottom-left to top-right)
    for (let row = 2; row < boardSize; row++) {
      for (let col = 0; col <= boardSize - 3; col++) {
        lines.push([
          row * boardSize + col,
          (row - 1) * boardSize + col + 1,
          (row - 2) * boardSize + col + 2,
        ]);
      }
    }
    // console.log(lines);

    // Check for a winner in each line
    for (const line of lines) {
      const [a, b, c] = line.sort();
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // console.log(`A ${a + 1} , B ${b + 1} , C ${c+1}`)
        // console.log(line)

        return {
          winner: squares[a],
          lineWin: `${a + 1} : ${b + 1} : ${c + 1}`,
          lineIndex: [a, b, c],
        };
      }
    }

    return null;
  }

  // handle when user click Square

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board, size)?.winner) {
      return;
    }

    const newBoard = board.slice();

    // console.log(newBoard);

    if (xIsNext) {
      newBoard[index] = "X";
    } else {
      newBoard[index] = "O";
    }

    // newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
    setHistory((history) => [
      ...history,
      {
        player: newBoard[index],
        move: index + 1,
      },
    ]);

    //check winner
    //If win determines the winner's score., else if Check all index board sizes are not null. = "Draw"
    const winner = calculateWinner(newBoard, size)?.winner;
    if (winner) {
      const { lineWin, lineIndex } = calculateWinner(newBoard, size);
      const squares = document.querySelectorAll(".square");

      squares[lineIndex[0]].classList.add("active");
      squares[lineIndex[1]].classList.add("active");
      squares[lineIndex[2]].classList.add("active");

      setLineWin(lineWin);
      setIndexLine(lineIndex);

      //set Modal & history
      setShowModal(true);
      setShowHistory(false);

      //set Score
      const newScores = { ...scores };
      newScores[winner] += 1;
      setScores(newScores);
      localStorage.setItem("ticTacToeScores", JSON.stringify(newScores));
    } else if (history.length + 1 === size * size) {
      setShowModal(true);
      setShowHistory(false);
      setLineWin("");
    }
  };

  // get winner
  const winner = calculateWinner(board, size)?.winner;

  //@Reset Board
  const handleReset = () => {
    handleNewGame();
    setScores({ X: 0, O: 0 });
    setShowSelectPlayer(true);
    localStorage.removeItem("ticTacToeScores");
  };

  //New Game "Round -->>>"
  const handleNewGame = () => {
    setBoard(Array(size).fill(null));
    player == "X" ? setXIsNext(true) : setXIsNext(false);
    setHistory([]);
    setLineWin("");
    setIndexLine([]);
  };

  //Close Modal Alert Winner Or Draw
  const closeModal = () => {
    handleNewGame();
    setShowModal(false);
  };

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

  useEffect(() => {
    player == "X" ? setXIsNext(true) : setXIsNext(false);
  }, [player]);

  useEffect(() => {
    if (winner) {
      const squares = document.querySelectorAll(".square");

      squares[indexLine[0]].classList.add("active");
      squares[indexLine[1]].classList.add("active");
      squares[indexLine[2]].classList.add("active");
    }
  }, [winner]);

  return (
    <div className="flex flex-col justify-center items-center h-auto mt-3 md:mt-0">
      {showSelectPlayer && (
        <SelectedPlayer handlePlayerFirst={handlePlayerFirst} />
      )}
      {showModal && (
        <Modal
          closeModal={closeModal}
          winner={winner ? winner : "Draw"}
          history={history}
          lineWin={lineWin}
          indexLine={indexLine}
        />
      )}
      <Status p={xIsNext} />

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
            Reset
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
      {showHistory && <HistoryBoard history={history} />}
    </div>
  );
}

export default CustomBoard;
