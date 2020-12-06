import { useCallback, useEffect, useState } from 'react';
import {
  getItem,
  subscribe,
  removeSubscriber,
  runner,
  TStoreItemData,
  getInitialItem,
} from '@storasy/core';

export const useStorasy = <Data>(
  key: string,
  generator?: () => Generator<any>
): [TStoreItemData<Data>, () => void] => {
  const [state, setState] = useState<TStoreItemData<Data>>(getItem(key) || getInitialItem());

  const run = useCallback(() => {
    if (generator) runner(key, generator());
  }, [key, generator]);

  useEffect(() => {
    const subscriber = (data: TStoreItemData<Data>) => setState(data);
    subscribe(key, setState);

    return () => {
      removeSubscriber(key, subscriber);
    };
  }, [key]);

  useEffect(() => {
    if (generator) run();
  }, []);

  return [state, run];
};
