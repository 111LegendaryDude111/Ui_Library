import { useLayoutEffect, useRef } from "react";

export const useLastValue = <T>(value?: T) => {
  const lastValue = useRef<T | undefined>(value);

  useLayoutEffect(() => {
    lastValue.current = value;

    return () => {
      lastValue.current = undefined;
    };
  });

  return lastValue;
};
