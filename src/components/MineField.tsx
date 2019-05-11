import * as React from 'react';
import Square from './Square';
import { SquareData } from '../lib/minefield';

interface MinefieldProps {
  field: SquareData[];
  height: number;
  width: number;
  onClick: (coordinate: number, isFlag?: boolean) => void;
}
export default ({ field, height, width, onClick }: MinefieldProps) => (
  <div
    className="mine-field"
    style={
      {
        '--height': height,
        '--width': width,
      } as any
    }
  >
    {field.map((data, index) => (
      <Square
        squareData={data}
        key={`${index}-${data.hasMine}-${data.neighborCount}`}
        coordinate={index}
        onClick={onClick}
      />
    ))}
  </div>
);
