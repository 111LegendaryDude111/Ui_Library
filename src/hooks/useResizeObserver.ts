import { useEffect, useState } from "react";

export const useResizeObserver = (
  targetRef: React.MutableRefObject<HTMLElement | null>,
  fn?: VoidFunction
) => {
  const [coord, setCoord] = useState({});

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      console.log(entries);
      const { left, right, top, bottom } = entries[0].contentRect;
      setCoord({ left, right, top, bottom });
    });

    resizeObserver.observe(target);

    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  console.log(coord);
};
