import { useEffect, useMemo, useRef, useState } from 'react';
import { TStorasyRunOptions, TStorasyItem } from '@storasy/core';

import { useStorasyClient } from './use-storasy-client';

interface IUseStorasyOptions<ItemState, Params = any> extends TStorasyRunOptions<Params> {
  initialState?: ItemState;
}

function* clearGenerator() {}

export const useStorasy = <ItemState, Params>(
  key: string,
  generator?: null | ((params?: Params) => Generator<any>),
  options?: IUseStorasyOptions<ItemState>
) => {
  const { initialState, params, enabled } = options ?? {};

  const storasyClient = useStorasyClient();

  const [itemState, setItemState] = useState<TStorasyItem<ItemState>>(
    storasyClient.create(key, initialState).getItem()
  );

  const refetchRef = useRef(null);

  useEffect(() => {
    const item = storasyClient.get<ItemState>(key);

    const { refetch, cancel } = storasyClient.run<ItemState, Params>(
      key,
      generator || clearGenerator,
      {
        enabled: enabled || Boolean(generator),
        params,
      }
    );

    refetchRef.current = refetch;

    const unsubscribe = item.subscribe(setItemState);

    return () => {
      if (storasyClient.include(key)) {
        cancel();
        unsubscribe();
      }
    };
  }, [params, enabled]);

  return useMemo(() => ({ ...itemState, refetch: refetchRef.current }), [itemState]);
};
