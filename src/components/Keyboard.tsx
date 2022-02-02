import React, { useCallback } from 'react';
import { TILES_COUNT } from '../lib/constants';
import { TileType, useController } from '../lib/controller';
import KeyboardKey from './KeyboardKey';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['submit', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
];

const Keyboard = () => {
  const { setRowTile, setActiveTile, activeTile } = useController();
  const onClick = useCallback(
    (character: string) => {
      const [activeRow, activeCell] = activeTile;

      if (character === 'submit') {
        console.log('TODO: submit');
      } else if (character === 'delete') {
        let previousRow = activeRow;
        let previousCell = activeCell - 1;

        if (activeCell === 0) {
          previousRow = previousRow - 1;
          previousCell = TILES_COUNT - 1;
        }

        setRowTile(previousRow, previousCell, {
          status: 'empty',
        } as TileType);

        setActiveTile([previousRow, previousCell]);
      } else {
        setRowTile(activeRow, activeCell, {
          status: 'submitted',
          character,
        } as TileType);

        if (activeCell === TILES_COUNT - 1) {
          console.log('TODO: Submission required');
        } else if (activeCell < TILES_COUNT - 1) {
          setActiveTile([activeRow, activeCell + 1]);
        }
      }
    },
    [setRowTile, setActiveTile, activeTile]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((character) => (
            <KeyboardKey key={character} {...{ character, onClick }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
