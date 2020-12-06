import * as React from 'react';
import { cleanup, render, act } from '@testing-library/react';
import { call, getItem } from '@storasy/core';

import { useStorasy } from './use-storasy';

afterEach(cleanup);

const INITIAL = {
  data: undefined,
  isLoading: false,
  isError: false,
  isLoaded: false,
  error: undefined,
};

it('render without crashing', () => {
  const TestComponent: React.FC = () => {
    const [data] = useStorasy('test');
    return <div data-testid="test">{JSON.stringify(data)}</div>;
  };

  const { getByTestId } = render(<TestComponent />);

  expect(getByTestId('test').textContent).toBe(JSON.stringify(INITIAL));
});

it('generator calling', () => {
  const yieldFn = jest.fn();

  const TestComponent: React.FC = () => {
    const [{ isLoading }] = useStorasy('test', function* generator() {
      yield call('test', yieldFn);
    });
    return <div data-testid="test">{isLoading ? 'loading' : 'loaded'}</div>;
  };

  const { getByTestId } = render(<TestComponent />);
  expect(yieldFn).toHaveBeenCalledTimes(1);
  expect(getByTestId('test').textContent).toBe('loading');
});
