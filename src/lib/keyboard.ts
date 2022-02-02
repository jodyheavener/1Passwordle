import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConfig } from './config';
import { ROWS_COUNT, TILES_COUNT } from './constants';
import { GameState, TileState, TileType, useController } from './controller';

const useKeyboard = () => {
  const { currentWord } = useConfig();
  const {
    gameState,
    setGameState,
    setRowTile,
    setActiveTile,
    activeTile,
    rows,
  } = useController();
  const [atEnd, setAtEnd] = useState<boolean>(false);

  // TODO: this is awful and I'm in a rush
  const keyStates = useMemo(() => {
    const keys: { [key: string]: TileState } = {};

    rows.forEach((row) => {
      row.forEach((tile) => {
        if (tile.state === TileState.Exact) {
          keys[tile.character!] = TileState.Exact;
        }
        if (tile.state === TileState.Absent) {
          keys[tile.character!] = TileState.Absent;
        }
        if (tile.state === TileState.Present) {
          keys[tile.character!] = TileState.Present;
        }
      });
    });

    return keys;
  }, [rows]);

  // TODO: this is awful and I'm in a rush
  const obfuscateRows = useCallback(() => {
    const [currentRow] = activeTile;
    const rowsToChange = rows.slice(0, Math.max(currentRow - 1, 0));
    rowsToChange.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile.state === TileState.Absent) {
          setRowTile(rowIndex, tileIndex, {
            ...tile,
            state: TileState.Hidden,
          });
        }
      });
    });
  }, [activeTile, rows, setRowTile]);

  const onEnter = useCallback(() => {
    const [currentRow] = activeTile;
    const rowTiles = rows[currentRow];
    const currentLetters = currentWord.split('');
    let isWinning = true;

    if (gameState !== GameState.Active || !atEnd) {
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
      setGameState(GameState.Won);
    } else if (currentRow === ROWS_COUNT - 1) {
      setGameState(GameState.Lost);
    } else {
      setActiveTile([currentRow + 1, 0]);
      obfuscateRows();
      setAtEnd(false);
    }
  }, [
    activeTile,
    atEnd,
    currentWord,
    gameState,
    obfuscateRows,
    rows,
    setActiveTile,
    setGameState,
    setRowTile,
  ]);

  const onBackspace = useCallback(() => {
    const [activeRow, activeCell] = activeTile;
    const nextCell = atEnd ? activeCell : activeCell - 1;

    if (gameState !== GameState.Active) {
      return;
    }

    setRowTile(activeRow, nextCell, {
      state: TileState.Empty,
    } as TileType);
    setAtEnd(false);
    if (nextCell >= 0) {
      setActiveTile([activeRow, nextCell]);
    }
  }, [activeTile, atEnd, gameState, setActiveTile, setRowTile]);

  const onKeyActivated = useCallback(
    (character: string) => {
      const [activeRow, activeCell] = activeTile;

      if (gameState !== GameState.Active || atEnd) {
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
    [activeTile, gameState, atEnd, setRowTile, setActiveTile]
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

  return { onEnter, onBackspace, onKeyActivated, keyStates };
};

export default useKeyboard;
