import React, {
  Children,
  cloneElement,
  useReducer,
  useRef,
  useState,
} from "react";
import { Option, OptionProps } from "./components/Option/Option";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";
import { ChevroneUp } from "./components/ChevroneUp/ChevroneUp";
import { ChevronDown } from "./components/ChevronDown/ChevronDown";
import { useCoordinates } from "../hooks/useCoordinates";

type DropdownProps = {
  children: JSX.Element | JSX.Element[];
  withDivider?: boolean;
  width?: string;
};

const Dropdown: React.FC<DropdownProps> & { Option: React.FC<OptionProps> } = ({
  children,
  withDivider,
  width = "400px",
}) => {
  const [open, toggle] = useReducer((prev) => !prev, false);

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const { top, left, width: widthFromHook } = useCoordinates(ref.current);

  return (
    <>
      <div className={styles.wrapper} style={{ width }} ref={ref}>
        <span>{selectedTitle ? selectedTitle : "Choose one"}</span>
        <span onClick={toggle}>{open ? <ChevroneUp /> : <ChevronDown />}</span>
      </div>
      {withDivider && <hr style={{ width: `${parseInt(width) - 100}px` }} />}
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={300}
        classNames={"dropdownContent"}
      >
        {() =>
          createPortal(
            <div
              className={styles.wrapperContent}
              style={{
                top,
                left,
                width: widthFromHook ?? width,
              }}
            >
              {Children.map(children, (child) => {
                return cloneElement(child, {
                  onClick: () => {
                    child.props.handleValue(child.props.value);
                    setSelectedTitle(child.props.title);
                    toggle();
                  },
                });
              })}
            </div>,
            document.getElementById("dropdown")!,
            "dropdown"
          )
        }
      </CSSTransition>
    </>
  );
};

Dropdown.Option = Option;

export { Dropdown };
