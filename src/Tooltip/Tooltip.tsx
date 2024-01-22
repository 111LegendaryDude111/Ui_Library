import { FC, cloneElement, useRef, useState } from "react";
import styles from "./style.module.css";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import { TooltipPosition } from "./types";
import { useCoordinates } from "../hooks/useCoordinates";

type TooltipProps = {
  position: TooltipPosition;
  content: string | JSX.Element;
  children: JSX.Element;
};
export const Tooltip: FC<TooltipProps> = ({ position, content, children }) => {
  const [isVisibleText, setIsVisibleText] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const { top, left, width } = useCoordinates(ref.current);

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
        document.getElementById("tooltip")!,
        "tooltip"
      )}
    </>
  );
};
export { TooltipPosition };
