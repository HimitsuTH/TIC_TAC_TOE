/* eslint-disable no-unused-vars */
import { useState } from "react";

// console.log(calculateWinner)

function CustomBoard() {
  const [boardSize, setBoardSize] = useState(4); // Default board size
  const [history, setHistory] = useState([
    Array(boardSize * boardSize).fill(null),
  ]);

  const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null | 0));
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [stepNumber, setStepNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [xIsNext, setXIsNext] = useState(true);

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
    console.log(lines)
    // Check for a winner in each line
    for (const line of lines) {
        const symbols = line.map(index => squares[index]);
        const allEqual = symbols.every(symbol => symbol && symbol === symbols[0]);
        if (allEqual) {
          return symbols[0];
        }
      }
    
      return null;
  }

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board, boardSize)) {
      return;
    }
    console.log(index);
    {
    //   console.log(board[0]);
    }

    const newBoard = board.slice();

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard, boardSize);
    if (winner) {
      setShowModal(true);
      const newScores = { ...scores };
      newScores[winner] += 1;
      setScores(newScores);
      localStorage.setItem("ticTacToeScores", JSON.stringify(newScores));
    }
  };

  const current = board[stepNumber];
  const winner = calculateWinner(current, boardSize);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleCustomBoard = () => {
    if (boardSize >= 3) {
      setHistory([Array(boardSize * boardSize).fill(null)]);
      setStepNumber(0);
      setXIsNext(true);
      setScores({ X: 0, O: 0 });
      localStorage.setItem(
        "ticTacToeHistory",
        JSON.stringify([Array(boardSize * boardSize).fill(null)])
      );
      localStorage.setItem("ticTacToeScores", JSON.stringify({ X: 0, O: 0 }));
    }else if(boardSize == undefined || boardSize == null){
        setBoard((Array(3 * 3).fill(null | 0)))
    } 
    
    else {
      alert("Board size must be at least 3.");
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

  return (
    <div className="CustomBoard">
      <div>
        <label htmlFor="boardSize">Enter board size: </label>
        <input
          type="number"
          id="boardSize"
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value))}
        />
        <button onClick={handleCustomBoard}>Set Board Size</button>
      </div>
      <div className="status">{status}</div>
      <div className="score">
        <p>Player X: {scores.X}</p>
        <p>Player O: {scores.O}</p>
      </div>
      <div className="board">
        {Array(boardSize)
          .fill(null)
          .map((_, row) => (
            <div className="row" key={row}>
              {Array(boardSize)
                .fill(null)
                .map((_, col) => renderSquare(row * boardSize + col))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomBoard;
