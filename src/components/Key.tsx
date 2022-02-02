import clsx from 'clsx';
import React from 'react';
import { TileState } from '../lib/controller';

const defaultClasses =
  'bg-lily-lavender dark:bg-kuretake-black-manga text-kuretake-black-manga dark:text-white rounded-lg uppercase';

const Key = ({
  character,
  onKeyActivated,
  onEnter,
  onBackspace,
  state,
}: {
  character: string;
  onKeyActivated: (character: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  state: TileState | null;
}) => {
  switch (character) {
    case 'SPACE':
      return <Spacer />;
    case 'ENTER':
      return <Enter {...{ onEnter }} />;
    case 'DELETE':
      return <Backspace {...{ onBackspace }} />;
    default:
      return <Character {...{ character, state, onKeyActivated }} />;
  }
};

const Spacer = () => <div className="w-5"></div>;

const Character = ({
  character,
  state,
  onKeyActivated,
}: Pick<
  React.ComponentProps<typeof Key>,
  'character' | 'state' | 'onKeyActivated'
>) => (
  <button
    className={clsx(
      defaultClasses,
      state === TileState.Absent && 'bg-grey-frost dark:bg-rhapsody-in-blue',
      state === TileState.Present && 'bg-clementine dark:bg-clementine',
      state === TileState.Exact &&
        'bg-sonata-green-minor dark:bg-sonata-green-minor',
      'text-xl md:text-2xl flex-1 mx-0.5 md:mx-1 py-3 '
    )}
    onClick={() => onKeyActivated(character)}
  >
    {character}
  </button>
);

const Enter = ({
  onEnter,
}: Pick<React.ComponentProps<typeof Key>, 'onEnter'>) => (
  <button
    className={clsx(
      defaultClasses,
      'text-lg md:text-xl tracking-wider font-semibold mx-1 py-2 px-3'
    )}
    onClick={onEnter}
  >
    Enter
  </button>
);

const Backspace = ({
  onBackspace,
}: Pick<React.ComponentProps<typeof Key>, 'onBackspace'>) => (
  <button
    className={clsx(
      defaultClasses,
      'text-lg md:text-xl font-semibold mx-1 p-2 md:px-3'
    )}
    onClick={onBackspace}
  >
    ⌫
  </button>
);

export default Key;
