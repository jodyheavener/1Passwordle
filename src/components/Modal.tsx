import React from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 bg-white bg-opacity-80 dark:bg-security-black dark:bg-opacity-80 flex items-center justify-center">
    <div className="bg-bits-blue dark:bg-kuretake-black-manga w-full m-4 p-5 shadow rounded-xl max-w-lg text-center">
      {children}
    </div>
  </div>
);

export default Modal;
