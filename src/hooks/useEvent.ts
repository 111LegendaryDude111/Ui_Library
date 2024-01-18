import { useCallback, useLayoutEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <T extends (...args: any[]) => any>(fn: T) => {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  const eventCb = useCallback(
    (...args: Parameters<T>) => {
      ref.current.apply(null, args);
    },
    [ref]
  );

  return eventCb;
};
