import React from 'react';

const KeyboardKey = ({
  character,
  onClick,
}: {
  character: string;
  onClick: (character: string) => void;
}) => <button onClick={() => onClick(character)}>{character}</button>;

export default KeyboardKey;
