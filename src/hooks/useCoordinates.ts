import { useLayoutEffect, useState } from "react";

type Coordinates = {
  top: number;
  left: number;
  width: number;
};

export const useCoordinates = (refElement: Element | null) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useLayoutEffect(() => {
    if (!refElement) return;

    const { top, left, width } = refElement.getBoundingClientRect();

    setCoordinates({ top, left, width });
  }, [refElement]);

  return {
    top: coordinates?.top ? coordinates.top : undefined,
    left: coordinates?.left ? coordinates.left : undefined,
    width: coordinates?.width ? coordinates.width : undefined,
  };
};
