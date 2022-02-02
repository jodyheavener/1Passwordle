import React from 'react';
import { ReactComponent as LogoDark } from '../images/logo-dark.svg';
import { ReactComponent as LogoLight } from '../images/logo-light.svg';

const Header = () => (
  <div className="flex justify-center py-3 bg-kuretake-black-manga bg-opacity-5 dark:bg-black dark:bg-opacity-20">
    <h1 className="inline-block max-w-xs max-h-10 md:max-h-12">
      <span className="sr-only">1Passwordle</span>
      <LogoLight className="dark:hidden w-full h-full" />
      <LogoDark className="hidden dark:block w-full h-full" />
    </h1>
  </div>
);

export default Header;
