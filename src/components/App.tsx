import React from 'react';
import { ConfigContextProvider } from '../lib/config';
import { ControllerContextProvider } from '../lib/controller';
import Board from './Board';
import Header from './Header';
import Keyboard from './Keyboard';

const App = () => (
  <ConfigContextProvider>
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <ControllerContextProvider>
        <Board />
        <Keyboard />
      </ControllerContextProvider>
    </div>
  </ConfigContextProvider>
);

export default App;
