import React, { useCallback, useContext, useState } from 'react';
import { ROWS_COUNT, TILES_COUNT } from './constants';
import useLocalStorage from './storage';

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
  gameState: GameState;
  activeTile: RowTileType;
  rows: RowType[];
};

type ControllerActionsType = {
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
  gameState: GameState.Active,
  activeTile: [0, 0],
  rows: defaultRows,
};

const defaultControllerValue = {
  ...defaultControllerData,
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
  const [storedGameState, setStoredGameState] = useLocalStorage(
    'game-state',
    GameState.Active
  );
  const [storedActiveTile, setStoredActiveTile] = useLocalStorage(
    'active-tile',
    defaultControllerData.activeTile
  );
  const [storedRows, setStoredRows] = useLocalStorage(
    'rows-data',
    defaultControllerData.rows
  );

  const [gameState, setGameState] =
    useState<ControllerDataType['gameState']>(storedGameState);
  const [activeTile, setActiveTile] =
    React.useState<ControllerDataType['activeTile']>(storedActiveTile);
  const [rows, setRows] =
    React.useState<ControllerDataType['rows']>(storedRows);

  const _setGameState = useCallback(
    (newState: GameState) => {
      setStoredGameState(newState);
      setGameState(newState);
    },
    [setStoredGameState]
  );

  const _setActiveTile = useCallback(
    (newTile: ControllerDataType['activeTile']) => {
      setStoredActiveTile(newTile);
      setActiveTile(newTile);
    },
    [setStoredActiveTile]
  );

  const _setRows = useCallback(
    (
      newRows:
        | ControllerDataType['rows']
        | ((existing: ControllerDataType['rows']) => ControllerDataType['rows'])
    ) => {
      if (newRows instanceof Function) {
        newRows = newRows(rows);
      }

      setStoredRows(newRows);
      setRows(newRows);
    },
    [rows, setStoredRows]
  );

  const setRowTile = useCallback(
    (rowIndex: number, tileIndex: number, tile: TileType) =>
      _setRows((rows) => {
        const newRows = [...rows];
        newRows[rowIndex][tileIndex] = tile;
        return newRows;
      }),
    [_setRows]
  );

  return (
    <ControllerContext.Provider
      value={{
        gameState,
        setGameState: _setGameState,
        activeTile,
        rows,
        setActiveTile: _setActiveTile,
        setRowTile,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
