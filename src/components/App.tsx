import React from 'react';
import { ConfigContextProvider, useConfig } from '../lib/config';
import { ControllerContextProvider } from '../lib/controller';
import Board from './Board';
import Header from './Header';
import Keyboard from './Keyboard';

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
      </ControllerContextProvider>
    );
  }
};

export default App;
