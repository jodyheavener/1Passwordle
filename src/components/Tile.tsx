import clsx from 'clsx';
import React from 'react';
import { TileType } from '../lib/controller';

const Tile = ({ tile: { status, character } }: { tile: TileType }) => (
  <div
    className={clsx(
      'flex-1 mx-2 flex items-center justify-center rounded-xl text-4xl uppercase font-semibold',
      status === 'empty' && 'border',
      status === 'submitted' && 'border'
    )}
  >
    <span>{character}</span>
  </div>
);

export default Tile;
