import * as React from 'react';
import Square from './Square';

export default ({ squares, y, field, onClick }) => (
  <div className="row">
    {squares.map((squareData, x) => (
      <Square
        squareData={squareData}
        key={`${x},${y}`}
        coordinate={[x, y]}
        onClick={onClick}
      />
    ))}
  </div>
);
