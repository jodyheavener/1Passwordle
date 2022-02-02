import clsx from 'clsx';
import React from 'react';
import { TileState, TileType } from '../lib/controller';

const Tile = ({ tile: { state, character } }: { tile: TileType }) => (
  <div
    className={clsx(
      'flex-1 mx-1 md:mx-1.5 flex items-center justify-center rounded-xl text-4xl uppercase font-semibold border-2',
      state === TileState.Empty && 'border-grey-frost dark:border-soft-navy',
      state === TileState.Submitted && 'text-soft-navy dark:text-white',
      state === TileState.Absent &&
        'bg-soft-navy dark:bg-rhapsody-in-blue border-transparent',
      state === TileState.Present && 'bg-clementine border-transparent',
      state === TileState.Exact && 'bg-sonata-green-minor border-transparent',
      state === TileState.Hidden &&
        'bg-soft-navy dark:bg-rhapsody-in-blue border-transparent'
    )}
  >
    <span className={clsx(state === TileState.Hidden && 'text-5xl h-7')}>
      {state === TileState.Hidden ? '*' : character}
    </span>
  </div>
);

export default Tile;
