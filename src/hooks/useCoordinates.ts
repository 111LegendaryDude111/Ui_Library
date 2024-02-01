import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LayerManager } from "../LayerManager";

type Coordinates = {
  top: number;
  left: number;
  width: number;
  bottom: number;
};

export const useCoordinates = (
  refElement: Element | null,
  cbOnResize?: VoidFunction
) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [recalculate, setRecalculate] = useState(false);
  const resizeCb = useRef(cbOnResize);

  useLayoutEffect(() => {
    if (!refElement) return;

    const resize = new ResizeObserver(() => {
      const { top, left, width, bottom } = refElement.getBoundingClientRect();

      setCoordinates({ top, left, width, bottom });
    });

    resize.observe(refElement);

    return () => {
      setCoordinates(null);
    };
  }, [refElement, recalculate]);

  useEffect(() => {
    const removeResize = LayerManager.addResizeEvent(() => {
      resizeCb.current?.();
      setRecalculate((prev) => !prev);
    });

    return () => removeResize();
  }, []);

  return {
    top: coordinates?.top ? coordinates.top : undefined,
    bottom: coordinates?.bottom ? coordinates.bottom : undefined,
    left: coordinates?.left ? coordinates.left : undefined,
    width: coordinates?.width ? coordinates.width : undefined,
  };
};
