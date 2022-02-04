import React, { useCallback, useContext, useEffect } from 'react';
import { ROWS_COUNT, TILES_COUNT } from './constants';
import { useLocaleState } from './storage';
import { datesEqual } from './utils';

export enum TileState {
  Empty,
  Submitted,
  Absent,
  Present,
  Exact,
  Hidden,
}

export enum GameState {
  Active,
  Won,
  Lost,
}

export type TileType = {
  state: TileState;
  character?: string;
};

export type RowTileType = [row: number, tile: number];

type RowType = TileType[];

type ControllerDataType = {
  initialized: boolean;
  lastPlayedAt: number | null;
  gameState: GameState;
  activeTile: RowTileType;
  atRowEnd: boolean;
  rows: RowType[];
};

type ControllerActionsType = {
  setInitialized: (initialized: boolean) => void;
  setLastPlayedAt: (timestamp: number) => void;
  setGameState: (state: GameState) => void;
  setActiveTile: (activeTile: RowTileType) => void;
  setAtRowEnd: (atEnd: boolean) => void;
  setRowTile: (rowIndex: number, tileIndex: number, tile: TileType) => void;
};

const defaultRows = Array.from({ length: ROWS_COUNT }, () =>
  Array.from(
    { length: TILES_COUNT },
    () => ({ state: TileState.Empty } as TileType)
  )
);

const defaultControllerData: ControllerDataType = {
  initialized: false,
  lastPlayedAt: 0,
  gameState: GameState.Active,
  activeTile: [0, 0],
  atRowEnd: false,
  rows: defaultRows,
};

const defaultControllerValue = {
  ...defaultControllerData,
  setInitialized: () => {},
  setLastPlayedAt: () => {},
  setGameState: () => {},
  setActiveTile: () => {},
  setAtRowEnd: () => {},
  setRowTile: () => {},
};

const ControllerContext = React.createContext<
  ControllerDataType & ControllerActionsType
>(defaultControllerValue);

export const ControllerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialized, setInitialized] = useLocaleState<
    ControllerDataType['initialized']
  >('initialized', false);
  const [lastPlayedAt, setLastPlayedAt] = useLocaleState<
    ControllerDataType['lastPlayedAt']
  >('last-played-at', null);
  const [gameState, setGameState] = useLocaleState<
    ControllerDataType['gameState']
  >('game-state', GameState.Active);
  const [activeTile, setActiveTile] = useLocaleState<
    ControllerDataType['activeTile']
  >('active-tile', defaultControllerData.activeTile);
  const [atRowEnd, setAtRowEnd] = useLocaleState<
    ControllerDataType['atRowEnd']
  >('at-row-end', false);
  const [rows, setRows] = useLocaleState<ControllerDataType['rows']>(
    'rows-data',
    defaultControllerData.rows
  );

  const setRowTile = useCallback(
    (rowIndex: number, tileIndex: number, tile: TileType) =>
      setRows((rows) => {
        const newRows = [...rows];
        newRows[rowIndex][tileIndex] = tile;
        return newRows;
      }),
    [setRows]
  );

  useEffect(() => {
    if (lastPlayedAt) {
      const today = new Date();
      const lastPlayed = new Date(lastPlayedAt);
      if (!datesEqual(today, lastPlayed)) {
        setGameState(GameState.Active);
        setLastPlayedAt(null);
        setActiveTile([0, 0]);
        setRows(defaultRows);
        setAtRowEnd(false);
      }
    }
  }, [
    lastPlayedAt,
    setActiveTile,
    setAtRowEnd,
    setGameState,
    setLastPlayedAt,
    setRows,
  ]);

  return (
    <ControllerContext.Provider
      value={{
        initialized,
        lastPlayedAt,
        gameState,
        activeTile,
        atRowEnd,
        rows,
        setRowTile,
        setInitialized,
        setLastPlayedAt,
        setGameState,
        setActiveTile,
        setAtRowEnd,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
