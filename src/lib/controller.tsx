import React, { useCallback, useContext, useState } from 'react';
import { ROWS_COUNT, TILES_COUNT } from './constants';

export enum TileState {
  Empty,
  Submitted,
  Absent,
  Present,
  Exact,
  Hidden,
}

export type TileType = {
  state: TileState;
  character?: string;
};

export type RowTileType = [row: number, tile: number];

type RowType = TileType[];

type ControllerDataType = {
  boardEnabled: boolean;
  activeTile: RowTileType;
  rows: RowType[];
};

type ControllerActionsType = {
  setBoardEnabled: (enabled: boolean) => void;
  setActiveTile: (activeTile: RowTileType) => void;
  setRowTile: (rowIndex: number, tileIndex: number, tile: TileType) => void;
};

const defaultRows = Array.from({ length: ROWS_COUNT }, () =>
  Array.from(
    { length: TILES_COUNT },
    () => ({ state: TileState.Empty } as TileType)
  )
);

// Some example tiles used for testing
//
// const defaultRows = [
//   [
//     { state: TileState.Exact, character: 's' },
//     { state: TileState.Hidden, character: 't' },
//     { state: TileState.Hidden, character: 'o' },
//     { state: TileState.Present, character: 'r' },
//     { state: TileState.Hidden, character: 'e' },
//   ],
//   [
//     { state: TileState.Exact, character: 'a' },
//     { state: TileState.Absent, character: 'w' },
//     { state: TileState.Absent, character: 'a' },
//     { state: TileState.Present, character: 'r' },
//     { state: TileState.Absent, character: 'd' },
//   ],
//   [
//     { state: TileState.Present, character: 's' },
//     { state: TileState.Exact, character: 'a' },
//     { state: TileState.Absent, character: 'f' },
//     { state: TileState.Absent, character: 'e' },
//     { state: TileState.Present, character: 'r' },
//   ],
//   [
//     { state: TileState.Submitted, character: 'v' },
//     { state: TileState.Submitted, character: 'a' },
//     { state: TileState.Submitted, character: 'l' },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//   ],
//   [
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//   ],
//   [
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//     { state: TileState.Empty },
//   ],
// ];

const defaultControllerData: ControllerDataType = {
  boardEnabled: false,
  activeTile: [0, 0],
  rows: defaultRows,
};

const defaultControllerValue = {
  ...defaultControllerData,
  setBoardEnabled: () => {},
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
  const [boardEnabled, setBoardEnabled] = useState<boolean>(true);
  const [activeTile, setActiveTile] = React.useState<
    ControllerDataType['activeTile']
  >(defaultControllerData.activeTile);
  const [rows, setRows] = React.useState<ControllerDataType['rows']>(
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
        boardEnabled,
        setBoardEnabled,
        activeTile,
        rows,
        setActiveTile,
        setRowTile,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
