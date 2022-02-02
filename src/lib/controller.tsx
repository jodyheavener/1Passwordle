import React, { useCallback, useContext } from 'react';
import { ROWS_COUNT, TILES_COUNT } from './constants';

export type TileState = 'empty' | 'submitted';
export type TileResult = 'exact' | 'present' | 'absent';
export type TileType = {
  status: TileState & TileResult;
  character?: string;
};

export type RowTileType = [row: number, tile: number];

type RowType = TileType[];

type ControllerDataType = {
  activeTile: RowTileType;
  rows: RowType[];
};

type ControllerActionsType = {
  setActiveTile: (activeTile: RowTileType) => void;
  setRowTile: (rowIndex: number, tileIndex: number, tile: TileType) => void;
};

const defaultControllerData: ControllerDataType = {
  activeTile: [0, 0],
  rows: Array.from({ length: ROWS_COUNT }, () =>
    Array.from({ length: TILES_COUNT }, () => ({ status: 'empty' } as TileType))
  ),
};

const defaultControllerValue = {
  ...defaultControllerData,
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
