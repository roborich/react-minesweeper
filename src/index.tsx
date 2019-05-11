import * as React from 'react';
import { render } from 'react-dom';
import MineField from './components/MineField';
import {
  createMinefield,
  unflaggedCount,
  revealAll,
  didWin,
  clearSquare,
} from './lib/minefield';
import Numbers from './components/Numbers';
import Timer from './components/Timer';
import './styles.scss';

const WIDTH = 16;
const HEIGHT = 16;
const MINE_COUNT = 40;
const emoji = {
  default: '🙂',
  lose: '😭',
  win: '😎',
  mineCount: ['😊', '😚', '😐', '🤔', '😕', '😯', '😦', '😧', '😨', '😱'],
};

const future = new Date(new Date().getTime() + 860000);
function Game() {
  const [turn, setTurn] = React.useState(0);
  const [startTime, setStartTime] = React.useState<Date>(future);
  const [field, setField] = React.useState(
    createMinefield(WIDTH, HEIGHT, MINE_COUNT),
  );
  const unFlagged = unflaggedCount(field, MINE_COUNT);
  const [gameTitle, setGameTitle] = React.useState(emoji.default);
  const newGame = () => {
    setStartTime(future);
    setGameTitle(emoji.default);
    setField(createMinefield(WIDTH, HEIGHT, MINE_COUNT));
  };
  const handleRightClick = (index: number) => {
    const newField = field.slice();
    newField[index].isFlagged = !newField[index].isFlagged;
    setField(newField);
  };
  const handleClick = (index: number, isFlag: boolean = false) => {
    if (isFlag) {
      return handleRightClick(index);
    }
    if (startTime === future) {
      setStartTime(new Date());
    }
    const newField = field.slice();

    if (field[index].hasMine) {
      setGameTitle(emoji.lose);
      revealAll(newField);
      setField(newField);
      return;
    }
    setGameTitle(emoji.mineCount[newField[index].neighborCount]);
    setTimeout(() => setGameTitle(emoji.default), 500);
    clearSquare(newField, WIDTH, HEIGHT, index);
    if (didWin(newField)) {
      setGameTitle(emoji.win);
    }
    setTurn(turn + 1);
  };
  return (
    <div
      className={`game game--${gameTitle === emoji.lose ? 'over' : 'active'}`}
    >
      <div className="title">
        Minesweeper
        <button onClick={newGame}>New Game</button>
      </div>

      <div className="board">
        <div className="header">
          <Numbers number={unFlagged} />
          <div className="title">{gameTitle}</div>

          <Timer startTime={startTime} />
        </div>
        <MineField
          field={field}
          height={HEIGHT}
          width={WIDTH}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<Game />, rootElement);
