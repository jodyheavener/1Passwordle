import { useCallback, useEffect, useState } from 'react';
import { useConfig } from './config';
import { ROWS_COUNT, TILES_COUNT } from './constants';
import { TileState, TileType, useController } from './controller';

const useKeyboard = () => {
  const { currentWord } = useConfig();
  const {
    boardEnabled,
    setBoardEnabled,
    setRowTile,
    setActiveTile,
    activeTile,
    rows,
  } = useController();
  const [atEnd, setAtEnd] = useState<boolean>(false);

  const onEnter = useCallback(() => {
    const [currentRow] = activeTile;
    const rowTiles = rows[currentRow];
    const currentLetters = currentWord.split('');
    let isWinning = true;

    if (!boardEnabled || !atEnd) {
      return;
    }

    for (let index = 0; index < rowTiles.length; index++) {
      const tile = rowTiles[index];
      let state: TileState = TileState.Absent;
      if (tile.character === currentLetters[index]) {
        state = TileState.Exact;
      } else if (currentLetters.includes(tile.character!)) {
        state = TileState.Present;
        isWinning = false;
      } else {
        isWinning = false;
      }

      setRowTile(activeTile[0], index, {
        ...tile,
        state,
      });
    }

    if (isWinning) {
      console.log('You win!');
      setBoardEnabled(false);
    } else if (currentRow === ROWS_COUNT - 1) {
      console.log('You lose!');
      setBoardEnabled(false);
    } else {
      setActiveTile([currentRow + 1, 0]);
      setAtEnd(false);
    }
  }, [
    activeTile,
    atEnd,
    boardEnabled,
    currentWord,
    rows,
    setActiveTile,
    setBoardEnabled,
    setRowTile,
  ]);

  const onBackspace = useCallback(() => {
    const [activeRow, activeCell] = activeTile;
    const nextCell = atEnd ? activeCell : activeCell - 1;

    if (!boardEnabled) {
      return;
    }

    setRowTile(activeRow, nextCell, {
      state: TileState.Empty,
    } as TileType);
    setAtEnd(false);
    if (nextCell >= 0) {
      setActiveTile([activeRow, nextCell]);
    }
  }, [activeTile, atEnd, boardEnabled, setActiveTile, setRowTile]);

  const onKeyActivated = useCallback(
    (character: string) => {
      const [activeRow, activeCell] = activeTile;

      if (!boardEnabled || atEnd) {
        return;
      }

      setRowTile(activeRow, activeCell, {
        state: TileState.Submitted,
        character,
      } as TileType);

      if (activeCell === TILES_COUNT - 1) {
        setAtEnd(true);
      } else if (activeCell < TILES_COUNT - 1) {
        setActiveTile([activeRow, activeCell + 1]);
      }
    },
    [activeTile, boardEnabled, atEnd, setRowTile, setActiveTile]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter();
      } else if (event.key === 'Backspace') {
        onBackspace();
      } else if (/^[A-Za-z]$/.test(event.key) && !event.metaKey) {
        onKeyActivated(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBackspace, onEnter, onKeyActivated]);

  return { onEnter, onBackspace, onKeyActivated };
};

export default useKeyboard;
