import React from 'react';
import { ConfigContextProvider, useConfig } from '../lib/config';
import { COMPLETED_URL } from '../lib/constants';
import {
  ControllerContextProvider,
  GameState,
  useController,
} from '../lib/controller';
import Board from './Board';
import Header from './Header';
import Keyboard from './Keyboard';
import Modal from './Modal';

const messageClasses =
  'flex items-center justify-center h-full text-lg text-kuretake-black-manga dark:text-white';

const App = () => (
  <ConfigContextProvider>
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <AppPresentation />
    </div>
  </ConfigContextProvider>
);

const AppPresentation = () => {
  const { loading, active } = useConfig();

  if (loading) {
    return (
      <div className={messageClasses}>
        <span className="text-center px-4">Loading...</span>
      </div>
    );
  }

  if (!active) {
    return (
      <div className={messageClasses}>
        <span className="text-center px-4">
          1Passwordle has ended (we ran out of words). Thank you for playing! ❤️
        </span>
      </div>
    );
  } else {
    return (
      <ControllerContextProvider>
        <Board />
        <Keyboard />
        <Modals />
      </ControllerContextProvider>
    );
  }
};

const Modals = () => {
  const { gameState, initialized } = useController();

  if (!initialized) {
    return <WelcomeModal />;
  }

  if (gameState === GameState.Won) {
    return <WonModal />;
  } else if (gameState === GameState.Lost) {
    return <LostModal />;
  }

  return null;
};

const WelcomeModal = () => {
  const { wordsRemaining } = useConfig();
  const { setInitialized } = useController();

  return (
    <Modal>
      <h2 className="font-semibold text-3xl mb-2">Welcome!</h2>
      <p className="mt-2 mb-4">
        You already know and love Wordle, so you should know what this is all
        about. Each day, over the next <b>{wordsRemaining} days</b>, you can
        solve a new 1Password-related word. Good luck!
      </p>
      <button
        className="bg-white dark:bg-thalassophile text-kuretake-black-manga rounded-full text-lg font-semibold py-2 px-4 block w-full"
        onClick={() => setInitialized(true)}
      >
        Start
      </button>
    </Modal>
  );
};

const WonModal = () => {
  const { wordsRemaining, currentWord } = useConfig();

  return (
    <Modal>
      <h2 className="font-semibold text-3xl mb-2">You did it! 🎉</h2>
      <p>
        Congratulations on solving today's word, "
        <b>{currentWord.toUpperCase()}</b>". Don't forget to come back tomorrow
        for the next word!
      </p>
      <p className="mt-2">
        There are still <b>{wordsRemaining} words</b> left.
      </p>
      <p className="mt-2 mb-4">
        This is <b>puzzle 10/13</b>, now you should head to the next puzzle:
      </p>
      <a
        href={COMPLETED_URL}
        target="_blank"
        rel="noreferrer"
        className="bg-white dark:bg-thalassophile text-kuretake-black-manga rounded-full text-lg font-semibold py-2 px-4 block"
      >
        Let's go!
      </a>
    </Modal>
  );
};

const LostModal = () => {
  const { wordsRemaining, currentWord } = useConfig();
  return (
    <Modal>
      <h2 className="font-semibold text-3xl mb-2">Sorry, you lost ☹️</h2>
      <p>
        We were looking for "<b>{currentWord.toUpperCase()}</b>". But don't
        worry - you can try again with tomorrow's word!
      </p>
      <p className="mt-2">
        There are still <b>{wordsRemaining} words</b> left.
      </p>
    </Modal>
  );
};

export default App;
