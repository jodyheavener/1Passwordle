import React from 'react';
import useKeyboard from '../lib/keyboard';
import Key from './Key';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['SPACE', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'SPACE'],
  ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'DELETE'],
];

const Keyboard = () => {
  const { onKeyActivated, onBackspace, onEnter, keyStates } = useKeyboard();

  return (
    <div className="w-full max-w-lg mx-auto mb-3">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mt-2">
          {row.map((character, index) => (
            <Key
              key={`${character}-${index}`}
              state={keyStates[character] || null}
              {...{ character, onKeyActivated, onBackspace, onEnter }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
