import React, { useContext, useEffect } from 'react';
import { START_DATE } from './constants';
import { daysSinceDate } from './utils';
import words from './words.json';

type ConfigType = {
  active: boolean;
  loading: boolean;
  totalWords: number;
  currentWord: string;
};

const defaultConfigValue = {
  active: false,
  loading: true,
  totalWords: words.length,
  currentWord: 'WORD_NOT_SET',
};

const ConfigContext = React.createContext<ConfigType>(defaultConfigValue);

export const ConfigContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = React.useState<ConfigType>(defaultConfigValue);

  useEffect(() => {
    const daysSinceStart = daysSinceDate(START_DATE);
    const newValue = {
      loading: false,
    };

    if (daysSinceStart < words.length - 1) {
      Object.assign(newValue, {
        active: true,
        currentWord: words[daysSinceStart],
      });
    }

    setValue({ ...defaultConfigValue, ...newValue });
  }, [setValue]);

  return (
    <ConfigContext.Provider {...{ value }}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
