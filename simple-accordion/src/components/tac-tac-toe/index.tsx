import "./styles.css";
import { useEffect, useState } from "react";

interface ISquareProps {
  value: string;
  onClick: () => void;
}

const Square = ({ value, onClick }: ISquareProps) => {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const winner = calculateWinner(board);
    if (!winner && !board.includes(null)) {
      setStatus("Draw");
    }
    if (winner) {
      setStatus(`Winner: ${winner}`);
    }
  }, [board]);

  const handleOnClick = (newInd: number) => {
    if (board[newInd] || status) {
      return;
    }
    const newBoard = board.map((square, index) => {
      if (index === newInd) {
        return isXNext ? "X" : "O";
      }
      return square;
    });
    setBoard(newBoard);
    setIsXNext((state) => !state);
  };

  const calculateWinner = (squares: string[]) => {
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
  };

  const handleOnReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus("");
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Tic Tac Toe</h1>
      <h2>{status}</h2>
      <div className="board-container">
        <div className="row">
          <Square value={board[0]} onClick={() => handleOnClick(0)} />
          <Square value={board[1]} onClick={() => handleOnClick(1)} />
          <Square value={board[2]} onClick={() => handleOnClick(2)} />
        </div>
        <div className="row">
          <Square value={board[3]} onClick={() => handleOnClick(3)} />
          <Square value={board[4]} onClick={() => handleOnClick(4)} />
          <Square value={board[5]} onClick={() => handleOnClick(5)} />
        </div>
        <div className="row">
          <Square value={board[6]} onClick={() => handleOnClick(6)} />
          <Square value={board[7]} onClick={() => handleOnClick(7)} />
          <Square value={board[8]} onClick={() => handleOnClick(8)} />
        </div>
        <div className="row">
          <button onClick={handleOnReset}>Reset Game</button>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;
