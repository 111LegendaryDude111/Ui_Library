import { FC, useState } from "react";
import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { TooltipPosition } from "./types";
import { useCoordinates } from "../hooks/useCoordinates";
import "./animation.css";

type TooltipProps = {
  position: TooltipPosition;
  content: string | JSX.Element;
  children: <T>(props: T) => JSX.Element;
};
export const Tooltip: FC<TooltipProps> = ({
  position,
  content,
  children,
  ...props
}) => {
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const { top, left, width } = useCoordinates(currentElement);

  const onMouseEnter = (e: MouseEvent) => {
    setCurrentElement(e.currentTarget as Element);
  };

  const onMouseLeave = () => {
    setCurrentElement(null);
  };
  return (
    <>
      {children({ onMouseEnter, onMouseLeave, ...props })}
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
