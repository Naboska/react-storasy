import React, { FC, ReactNode, useMemo } from 'react';
import { createStorasyClient, TStorasyClient } from '@storasy/core';
import { StorasyContextProvider } from './use-storasy-client';

type TStorasyClientProvider = {
  children: ReactNode;
  client?: TStorasyClient;
};

export const StorasyClientProvider: FC<TStorasyClientProvider> = ({ client, children }) => {
  const ctx = useMemo(() => client ?? createStorasyClient(), [client]);

  return <StorasyContextProvider value={ctx}>{children}</StorasyContextProvider>;
};
