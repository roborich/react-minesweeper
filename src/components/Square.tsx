import * as React from 'react';
import { SquareData } from '../lib/minefield';
const { useState, useCallback } = React;

interface SquareProps {
  squareData: SquareData;
  coordinate: number;
  onClick: (coordinate: number, isFlag?: boolean) => void;
}
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

export default ({ squareData, coordinate, onClick }: SquareProps) => {
  const { isCleared, isFlagged, hasMine, neighborCount } = squareData;

  const [isLongPressing, setLongPressing] = useState(false);
  const [isLongPressPending, setLongPressPending] = useState(false);
  const activateLongPress = useCallback(() => {
    if (isLongPressPending) {
      setLongPressPending(false);
      setLongPressing(true);
    }
  }, [isLongPressPending]);
  const startLongPress = () => {
    setLongPressPending(true);
    wait(500).then(activateLongPress);
  };
  const clearLongPress = () => {
    setLongPressPending(false);
    setLongPressing(false);
  };

  const tryLongPress = () => {
    console.log('try long press');
    if (isLongPressing) {
      onClick(coordinate, true);
    }
    clearLongPress();
  };

  const handleClick = () => {
    if (isFlagged || isCleared) {
      return;
    }
    clearLongPress();
    onClick(coordinate);
  };
  const rightClick = (e: any) => {
    e.preventDefault();
    if (isCleared) {
      return;
    }
    onClick(coordinate, true);
  };

  const underText = hasMine ? '💥' : String(neighborCount || '');
  const className = isCleared
    ? `square square-cleared square-${neighborCount}`
    : 'square';
  return (
    <div
      className={className}
      onClick={handleClick}
      onContextMenu={rightClick}
      onTouchStart={startLongPress}
      onTouchEnd={tryLongPress}
    >
      {isFlagged ? (
        <span className="flag">🚩</span>
      ) : isCleared ? (
        underText
      ) : (
        ''
      )}
    </div>
  );
};
