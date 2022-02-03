import React, { useCallback, useContext } from 'react';
import { ROWS_COUNT, TILES_COUNT } from './constants';
import { useLocaleState } from './storage';

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
  gameState: GameState;
  activeTile: RowTileType;
  rows: RowType[];
};

type ControllerActionsType = {
  setInitialized: (initialized: boolean) => void;
  setGameState: (state: GameState) => void;
  setActiveTile: (activeTile: RowTileType) => void;
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
  gameState: GameState.Active,
  activeTile: [0, 0],
  rows: defaultRows,
};

const defaultControllerValue = {
  ...defaultControllerData,
  setInitialized: () => {},
  setGameState: () => {},
  setActiveTile: () => {},
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
  const [gameState, setGameState] = useLocaleState<
    ControllerDataType['gameState']
  >('game-state', GameState.Active);
  const [activeTile, setActiveTile] = useLocaleState<
    ControllerDataType['activeTile']
  >('active-tile', defaultControllerData.activeTile);
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

  return (
    <ControllerContext.Provider
      value={{
        initialized,
        gameState,
        activeTile,
        rows,
        setRowTile,
        setInitialized,
        setGameState,
        setActiveTile,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
