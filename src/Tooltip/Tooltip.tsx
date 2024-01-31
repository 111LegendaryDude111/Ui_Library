import { FC, useRef, useState } from "react";
import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { TooltipPosition } from "./types";
import { useCoordinates } from "../hooks/useCoordinates";
import "./animation.css";

type TooltipProps = {
  position: TooltipPosition;
  content: string | JSX.Element;
  children: (props: {
    onMouseEnter: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  }) => JSX.Element;
};
export const Tooltip: FC<TooltipProps> = ({ position, content, children }) => {
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const { top, left, width } = useCoordinates(currentElement);

  const elementLink = useRef<Element | null>(null);

  const onMouseEnter = (e: React.MouseEvent) => {
    elementLink.current = e.currentTarget;
    setTimeout(() => {
      const element = elementLink.current;

      if (!element) {
        return;
      }
      setCurrentElement(element);
    }, 300);
  };

  const onMouseLeave = () => {
    elementLink.current = null;
    setCurrentElement(null);
  };

  return (
    <>
      {children({ onMouseEnter, onMouseLeave })}
      {createPortal(
        <CSSTransition
          in={!!currentElement}
          unmountOnExit
          timeout={300}
          classNames={"tooltipContent"}
        >
          <div
            className={styles.tooltip}
            style={{
              top:
                position === TooltipPosition.top
                  ? top && top - 30
                  : top && top + 30,
              left,
              width,
            }}
          >
            {content}
          </div>
        </CSSTransition>,
        document.body,
        "tooltip"
      )}
    </>
  );
};
export { TooltipPosition };
