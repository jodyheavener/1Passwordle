import React from 'react';
import { useController } from '../lib/controller';
import Tile from './Tile';

const Board = () => {
  const { rows } = useController();

  return (
    <div
      className="w-full max-w-md mx-auto flex flex-col flex-auto"
      style={{ maxHeight: '60vh' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row flex-1 justify-between my-1 md:my-1.5 mx-2 md:mx-0"
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
