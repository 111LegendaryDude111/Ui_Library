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
  const [isVisibleText, setIsVisibleText] = useState(true);
  const [style, setStyle] = useState<null | {
    left: number;
    top: number;
    width: number;
  }>(null);

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const { top, left, width } = element.getBoundingClientRect();

    setStyle({
      top: position === TooltipPosition.top ? top - 30 : top + 30,
      left,
      width,
    });
  }, [position]);

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
              top: style?.top ? style.top : undefined,
              left: style?.left ? style.left : undefined,
              width: style?.width ? style.width : undefined,
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
