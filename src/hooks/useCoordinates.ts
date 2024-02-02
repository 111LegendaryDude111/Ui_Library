import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRafThrottle } from "./useRafThrottle";

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
  const resizeCb = useRef(cbOnResize);
  const rafThrottled = useRafThrottle();

  const resizeCalculate = useCallback(() => {
    resizeCb.current?.();
    if (!refElement) {
      return;
    }

    const { top, left, width, bottom } = refElement.getBoundingClientRect();

    setCoordinates({ top, left, width, bottom });
  }, [refElement]);

  useLayoutEffect(() => {
    if (!refElement) return;

    const trottledCb = rafThrottled(resizeCalculate);

    const resize = new ResizeObserver(trottledCb);

    resize.observe(refElement);

    return () => {
      resize.disconnect();
      setCoordinates(null);
    };
  }, [rafThrottled, refElement, resizeCalculate]);

  useEffect(() => {
    const trottledCb = rafThrottled(resizeCalculate);

    window.addEventListener("resize", trottledCb);

    return () => {
      window.removeEventListener("resize", trottledCb);
    };
  }, [rafThrottled, resizeCalculate]);

  return {
    top: coordinates?.top ? coordinates.top : undefined,
    bottom: coordinates?.bottom ? coordinates.bottom : undefined,
    left: coordinates?.left ? coordinates.left : undefined,
    width: coordinates?.width ? coordinates.width : undefined,
  };
};
