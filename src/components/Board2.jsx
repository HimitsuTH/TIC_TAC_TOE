import { useState } from "react";

function Board2({ size, calculateWinner}) {

  const [board, setBoard] = useState(Array(size).fill(null));
  const [xPlaying, setXPlaying] = useState(true);

//   console.log(board);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xPlaying ? "X" : "O";
    setBoard(newBoard);
    setXPlaying(!xPlaying);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)} key={index}>
      {board[index] ? board[index] : ""}
    </button>
  );

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xPlaying ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
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
    </>
  );
}



export default Board2;
