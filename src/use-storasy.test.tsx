import React, { ReactNode } from 'react';
import { cleanup, render } from '@testing-library/react';
import { createStorasyClient } from '@storasy/core';

import { useStorasy } from './use-storasy';
import { StorasyClientProvider } from './storasy-client-provider';

afterEach(cleanup);

const setup = (child: ReactNode) => {
  const client = createStorasyClient();

  const Component = () => <StorasyClientProvider {...{ client }}>{child}</StorasyClientProvider>;

  return {
    client,
    utils: render(<Component />),
  };
};

describe('react-storasy test', () => {
  test('render without crashing', () => {
    const INITIAL = 'test';

    const TEST = () => {
      const { state } = useStorasy('test', null, { initialState: INITIAL });
      return <div data-testid="test">{state}</div>;
    };

    const { utils } = setup(<TEST />);

    expect(utils.getByTestId('test').textContent).toBe(INITIAL);
  });
});

// it('generator calling', () => {
//   const yieldFn = jest.fn();
//
//   const TestComponent: React.FC = () => {
//     const [{ isLoading }] = useStorasy('test', function* generator() {
//       yield call('test', yieldFn);
//     });
//     return <div data-testid="test">{isLoading ? 'loading' : 'loaded'}</div>;
//   };
//
//   const { getByTestId } = render(<TestComponent />);
//   expect(yieldFn).toHaveBeenCalledTimes(1);
//   expect(getByTestId('test').textContent).toBe('loading');
// });
