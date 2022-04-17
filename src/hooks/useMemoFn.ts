import { useCallback, useRef } from 'react';

export default function <
  ResultFn extends (...args: any[]) => ReturnType<ResultFn>
>(fn: ResultFn): ResultFn {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const fn1 = useCallback((...args) => fnRef.current(...args), []);

  return fn1 as ResultFn;
}
