import React from 'react';
import { useController } from '../lib/controller';
import Tile from './Tile';

const Board = () => {
  const { rows } = useController();

  return (
    <div
      className="w-full max-w-md mx-auto flex flex-col flex-auto"
      style={{ maxHeight: '600px' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row flex-1 justify-between my-2"
        >
          {row.map((tile, tileIndex) => (
            <Tile key={`${rowIndex}-${tileIndex}`} {...{ tile }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
