import * as React from 'react';
import './Numbers.scss';

const SevenSegment = ({ number }) => {
  return (
    <div className={`seven-segment seven-segment--${number}`}>
      <div className="seven-segment__top" />
      <div className="seven-segment__bottom" />
    </div>
  );
};
export default ({ number }) => {
  const numbers = String(Math.min(999, number))
    .padStart(3, '0')
    .split('')
    .map(n => Number(n));

  return (
    <div className="numbers">
      {numbers.map((number, i) => (
        <SevenSegment number={number} key={i} />
      ))}
    </div>
  );
};
