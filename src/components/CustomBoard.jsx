/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "./Modal";

// console.log(calculateWinner)

function CustomBoard() {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const [inputSize, setInputSize] = useState(3);
  const [size, setSize] = useState(3);

  //setInputSize
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    // Check if the new value is a valid number
    if (!isNaN(newValue)) {
      setInputSize(parseInt(newValue));
    }
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
      alert("Board size must be at least 3.");

      return;
    } else if (inputSize > 6) {
      alert("board size up to 6");

      return;
    } else {
      setSize(inputSize);
      setBoard(Array(size).fill(null));
      setXIsNext(true);
      setHistory([]);
    }
  };

  function calculateWinner(squares, size) {
    const lines = [];

    // Generate winning combinations for rows
    for (let row = 0; row < size; row++) {
      lines.push(Array.from({ length: size }, (_, col) => row * size + col));
    }

    // Generate winning combinations for columns
    for (let col = 0; col < size; col++) {
      lines.push(Array.from({ length: size }, (_, row) => row * size + col));
    }

    // Generate winning combinations for diagonals
    lines.push(Array.from({ length: size }, (_, i) => i * (size + 1)));
    lines.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1)));

    // Check for a winner in each line
    for (const line of lines) {
      const symbols = line.map((index) => squares[index]);

      // console.log(symbols)

      // allEqual ? true : false
      const allEqual = symbols.every(
        (symbol) => symbol && symbol === symbols[0]
      );
      if (allEqual) {
        return symbols[0];
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
      <div className="score fixed right-5 m-5 select-none top-0">
        <p className=" p-3 rounded-xl bg-red-800 mb-2 text-white">
          Player X : <strong>{scores.X}</strong>
        </p>
        <p className=" p-3 rounded-xl bg-green-800  text-white">
          Player O : <strong>{scores.O}</strong>
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
          <div className=" flex gap-x-5  p-1 items-center text-xs md:text-base">
            <label htmlFor="boardSize" className=" select-none">Enter board size : </label>
            <input
              type="number"
              id="boardSize"
              className=" text-center rounded-lg "
              value={inputSize}
              onChange={handleInputChange}
            />
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
                <p >Turn : {i + 1}</p>
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
