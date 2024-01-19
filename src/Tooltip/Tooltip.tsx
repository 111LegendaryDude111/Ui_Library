import { FC, cloneElement, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import { TooltipPosition } from "./types";

type TooltipProps = {
  position: TooltipPosition;
  content: string | JSX.Element;
  children: JSX.Element;
};
export const Tooltip: FC<TooltipProps> = ({ position, content, children }) => {
  const [isVisibleText, setIsVisibleText] = useState(false);
  const [coordinates, setCoordinate] = useState<null | {
    x: number;
    y: number;
  }>(null);

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const { top, left } = element.getBoundingClientRect();
    setCoordinate({ x: top, y: left });
  }, []);

  let top;

  if (coordinates?.y) {
    top =
      position === TooltipPosition.top ? coordinates.y - 100 : coordinates.y;
  }
  return (
    <>
      {cloneElement(children, {
        ...children.props,
        onMouseEnter: () => {
          setIsVisibleText(true);
        },
        onMouseLeave: () => {
          setIsVisibleText(false);
        },
        ref: ref,
      })}
      {createPortal(
        <CSSTransition
          in={isVisibleText}
          unmountOnExit
          timeout={300}
          classNames={"tooltipContent"}
        >
          <div
            className={styles.tooltip}
            style={{
              top,
            }}
          >
            {content}
          </div>
        </CSSTransition>,
        document.getElementById("tooltip")!,
        "tooltip"
      )}
    </>
  );
};
export { TooltipPosition };
