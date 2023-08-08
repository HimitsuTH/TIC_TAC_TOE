import { useState } from "react";
import Modal from "./Modal";

function Board3({ size }) {
  const [board, setBoard] = useState(Array(size).fill(null));
  const [showModal, setShowModal] = useState(false);

  const [historyPlay, setHistoryPlay] = useState([]);

  //Score
  const savedScores = JSON.parse(localStorage.getItem("ticTacToeScores"));
  const [scores, setScores] = useState(savedScores || { X: 0, O: 0 });

  //Set start player
  const [xPlaying, setXPlaying] = useState(true);

  //   console.log(board);

  // get winner
  const winner = calculateWinner(board);
  // status game
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xPlaying ? "X" : "O"}`;

  // handle when user click Square
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xPlaying ? "X" : "O";
    setBoard(newBoard);
    setXPlaying(!xPlaying);
    setHistoryPlay((pre) => [...pre, { mark: newBoard[index], move: index }]);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setShowModal(true);
      const newScores = { ...scores };
      newScores[winner] += 1;
      setScores(newScores);
      localStorage.setItem("ticTacToeScores", JSON.stringify(newScores));
    } else if (historyPlay.length + 1 === size) {
      // No winner and all squares are occupied, it's a draw
      setShowModal(true);
    }
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

  //@Reset Board
  const handleReset = () => {
    setBoard(Array(size).fill(null));
    setXPlaying(true);
    setScores({ X: 0, O: 0 });
    setHistoryPlay([]);
    localStorage.removeItem("ticTacToeScores");
  };

  const handleNewGame = () => {
    setBoard(Array(size).fill(null));
    setXPlaying(true);
    setHistoryPlay([]);
  };

  // Check Winner 3X3
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
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


  //Close Modal Alert Winner Or Draw
  const closeModal = () => {
    handleNewGame()
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="status">{status}</div>
        {showModal && (
          <Modal
            closeModal={closeModal}
            winner={winner ? winner : "Draw"}
      
          />
        )}
        <div className="score fixed right-5 m-5 select-none top-0">
          <p className=" p-3 rounded-xl bg-red-800 mb-2 text-white">
            Player X: {scores.X}
          </p>
          <p className=" p-3 rounded-xl bg-green-800  text-white">
            Player O: {scores.O}
          </p>
        </div>
        <div className=" flex flex-row relative">
          <div className="board">
            {Array(3)
              .fill(null)
              .map((_, row) => (
                <div className="row" key={row}>
                  {Array(3)
                    .fill(null)
                    .map((_, col) => renderSquare(row * 3 + col))}
                </div>
              ))}
          </div>
          <div className="flex  flex-col overflow-y-scroll h-auto w-56 scroll">
            {historyPlay.map((h, i) => (
              <div key={i} className="flex justify-center gap-3">
                <p>Player: {h?.mark}</p>
                <p>move: {h?.move + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="p-2 mt-5 bg-slate-700 text-white rounded-md hover:bg-slate-200 hover:text-slate-700 
      transition-all duration-300"
        onClick={() => handleReset()}
      >
        Reset Game
      </button>
    </>
  );
}

export default Board3;
