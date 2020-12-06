# React-Storasy
<p>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@storasy/core">
    <img alt="" src="https://badgen.net/npm/v/@storasy/react">
  </a>
    <a aria-label="Package size" href="https://bundlephobia.com/result?p=@storasy/core">
      <img alt="" src="https://badgen.net/bundlephobia/minzip/@storasy/react">
    </a>
    <a aria-label="Hist" href="https://www.jsdelivr.com/package/npm/@storasy/core">
      <img alt="" src="https://data.jsdelivr.com/v1/package/npm/@storasy/react/badge">
    </a>
</p>

![React Storasy Header](https://github.com/Naboska/react-storasy/raw/main/media/logo.png)
Library for working with asynchronous data.
The library uses the [Storasy](https://github.com/Naboska/storasy) core.

**status**: in development

<br/>

## Usage

<br/>

Inside your project directory, run in terminal:

```
yarn add @storasy/core @storasy/react
```

Or with npm:

```
npm install @storasy/core @storasy/react
```

## [API](https://github.com/Naboska/storasy#API)

API for @storasy/core

## Examples

- [Configuration](https://github.com/Naboska/storasy#configuration)
- [useStorasy](#useStorasy)

### useStorasy

The hook subscribes to the change by key.

```tsx
import { useStorasy } from '@storasy/react';
import { call, setItem } from '@storasy/core';

type TStorasyData = {
  a: number;
}

const INITIAL_DATA: TStorasyData = {
  a: 0,
}

// args = all arguments from the generator are passed
const fetcher = async (...args, token) => {
  return await fetch('any url', { signal: token })
    .then(e => e.json())
};

function* getData(...args) {
  const response = yield call('key', fetcher, ...args);
  setItem('key', () => response);
}

const Component = () => {
  const [{ data, isLoading, isError }] = useStorasy<TStorasyData>('key');
  
  const { a } = data ?? INITIAL_DATA;
  
  return (
    <span>a = {a}</span>
  )
}

```

## License

The MIT License.
