import { createContext, useContext } from 'react';
import { TStorasyClient } from '@storasy/core';

const StorasyClientContext = createContext<TStorasyClient>({} as TStorasyClient);
StorasyClientContext.displayName = 'StorasyClient';

export const StorasyContextProvider = StorasyClientContext.Provider;

export const useStorasyClient = () => useContext<TStorasyClient>(StorasyClientContext);
