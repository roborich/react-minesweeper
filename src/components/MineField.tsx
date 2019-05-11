import * as React from 'react';
import Square from './Square';
export default ({ field, height, width, onClick }) => (
  <div
    className="mine-field"
    style={{
      '--height': height,
      '--width': width,
    }}
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
