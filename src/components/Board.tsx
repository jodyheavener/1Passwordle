import React from 'react';
import { GameState, useController } from '../lib/controller';
import Tile from './Tile';

const Board = () => {
  const { rows, activeTile, gameState } = useController();

  return (
    <div
      className="w-full max-w-md mx-auto flex flex-col flex-auto my-4"
      style={{ maxHeight: '60vh' }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row flex-1 justify-between my-1 md:my-1.5 px-12 md:px-0 relative"
        >
          {row.map((tile, tileIndex) => (
            <React.Fragment key={`${rowIndex}-${tileIndex}`}>
              {gameState === GameState.Active && activeTile[0] === rowIndex && (
                <div className="absolute left-0 top-1 bottom-1 bg-bits-blue dark:bg-white dark:bg-opacity-10 w-0.5 sm:w-1 rounded-r sm:rounded sm:top-2 sm:bottom-2 sm:-left-2" />
              )}
              <Tile {...{ tile }} />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
