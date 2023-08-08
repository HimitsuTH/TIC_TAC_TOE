import "./App.css";
import Board2 from "./components/Board2";
import Board4 from "./components/Board4";



function App() {
  return (
    <div className="App">
      <div className="board ">
        <Board2 size={9} calculateWinner={calculateWinner2} />
      </div>
      <div className="board">
        <Board4 size={16} calculateWinner={calculateWinner4} />
      </div>
    </div>
  );
}

function calculateWinner2(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function calculateWinner4(squares) {
  const lines = [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return squares[a];
    }
  }

  return null;
}

export default App;
