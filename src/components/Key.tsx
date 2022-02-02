import clsx from 'clsx';
import React from 'react';

const defaultClasses =
  'bg-lily-lavender dark:bg-kuretake-black-manga text-kuretake-black-manga dark:text-white rounded-lg uppercase';

const Key = ({
  character,
  onKeyActivated,
  onEnter,
  onBackspace,
}: {
  character: string;
  onKeyActivated: (character: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}) => {
  switch (character) {
    case 'SPACE':
      return <Spacer />;
    case 'ENTER':
      return <Enter {...{ onEnter }} />;
    case 'DELETE':
      return <Backspace {...{ onBackspace }} />;
    default:
      return <Character {...{ character, onKeyActivated }} />;
  }
};

const Spacer = () => <div className="w-5"></div>;

const Character = ({
  character,
  onKeyActivated,
}: Pick<React.ComponentProps<typeof Key>, 'character' | 'onKeyActivated'>) => (
  <button
    className={clsx(
      defaultClasses,
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
