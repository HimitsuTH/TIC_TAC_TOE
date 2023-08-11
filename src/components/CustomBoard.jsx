/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

//Components
import SelectedPlayer from "./Board/SelectedPlayer";
import Status from "./Board/Status";
import PlayerScore from "./Board/PlayerScore";
import Modal from "./Board/Modal";
import HistoryBoard from "./Board/HistoryBoard";

import { Dropdown } from "./ui/dropdown";

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
  const [linesIndex, setLinesIndex] = useState([]);

  //Score
  const savedScores = JSON.parse(localStorage.getItem("ticTacToeScores"));
  const [scores, setScores] = useState(savedScores || { X: 0, O: 0 });

  const [showModal, setShowModal] = useState(false);

  //First player X or O
  const handlePlayerFirst = (e) => {
    setPlayer(e.target.value);
    setShowSelectPlayer(false);
  };

  //setInputSize
  const handleChange = (event) => {
    setInputSize(event.target.value);
  };

  //history replay
  const handleClickHistory = (h, i) => {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => square.classList.remove("replay"));

    squares[h.move].classList.add("replay");
  };

  //handle when user click button "Set Board"❤
  const handleCustomBoard = () => {
    // console.log(inputSize)
    if (inputSize) {
      setSize(inputSize);
      setBoard(Array(size).fill(null));
      setHistory([]);
    } 
    return;
  };

  // handle when user click Square
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board, size)?.winner) {
      return;
    }

    const newBoard = board.slice();
    const squares = document.querySelectorAll(".square");
    const history_ = document.querySelectorAll(".history_");

    squares.forEach((square) => square.classList.remove("replay"));

    newBoard[index] = xIsNext ? "X" : "O";

    const col = Math.floor(index % size),
      row = Math.floor(index / size),
      //col and row where the latest click happened
      clickPosition = "(row:" + row + ", col:" + col + ")";

    setBoard(newBoard);
    setXIsNext((prev) => !prev);
    setHistory((history) => [
      ...history,
      {
        player: newBoard[index],
        move: index,
        position: clickPosition,
        boardHistory: newBoard,
      },
    ]);

    history_.forEach((h) => h.classList.remove("active"));

    // console.log(history);

    //check winner
    //If win determines the winner's score.
    //else if Check all index board sizes are not null. = "Draw".
    const winner = calculateWinner(newBoard, size)?.winner;
    if (winner) {
      const { lineWin, lineIndex } = calculateWinner(newBoard, size);
      // console.log(lineIndex);

      //set index & line win
      setLineWin(lineWin);
      setLinesIndex(lineIndex);

      //set Modal & history
      setShowModal(true);
      setShowHistory(false);

      //update score winner.
      const newScores = { ...scores };
      newScores[winner] += 1;
      setScores(newScores);
      localStorage.setItem("ticTacToeScores", JSON.stringify(newScores));

      //check Draw if board is full.
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
    setShowSelectPlayer(true);
    setScores({ X: 0, O: 0 });
    localStorage.removeItem("ticTacToeScores");
  };

  //New Game "Round -->>>"
  const handleNewGame = () => {
    setBoard(Array(size).fill(null));
    player == "X" ? setXIsNext(true) : setXIsNext(false);
    setHistory([]);
    setLineWin("");
    setLinesIndex([]);
  };

  //Close Modal Alert Winner Or Draw
  const closeModal = () => {
    handleNewGame();
    setShowModal(false);
  };

  //Squares
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

  //select player X OR O
  useEffect(() => {
    player == "X" ? setXIsNext(true) : setXIsNext(false);
    setScores({ X: 0, O: 0 });
    localStorage.removeItem("ticTacToeScores");
  }, [player]);

  //Active Squares Lines win.
  useEffect(() => {
    if (winner) {
      const squares = document.querySelectorAll(".square");

      squares[linesIndex[0]].classList.add("active");
      squares[linesIndex[1]].classList.add("active");
      squares[linesIndex[2]].classList.add("active");
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
          linesIndex={linesIndex}
        />
      )}
      <Status p={xIsNext} />

      <PlayerScore scores={scores} />

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
            <Dropdown inputSize={inputSize} handleChange={handleChange} />
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
      {showHistory && (
        <HistoryBoard
          history={history}
          handleClickHistory={handleClickHistory}
        />
      )}
    </div>
  );
}

export default CustomBoard;

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
    const [a, b, c] = line.sort((a, b) => a - b);

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // console.log(`A ${a + 1} , B ${b + 1} , C ${c+1}`)
      // console.log(line)

      return {
        winner: squares[a],
        lineWin: `${a} : ${b} : ${c}`,
        lineIndex: [a, b, c],
      };
    }
  }

  return null;
}
