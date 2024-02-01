import React, { Children, cloneElement, useReducer, useRef } from "react";
import { Option, OptionProps } from "./components/Option/Option";
import { CSSTransition } from "react-transition-group";
import "./animation.css";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";
import { ChevroneUp } from "../share/ChevroneUp/ChevroneUp";
import { ChevronDown } from "../share/ChevronDown/ChevronDown";
import { useCoordinates } from "../hooks/useCoordinates";

type DropdownProps = {
  children: JSX.Element | JSX.Element[];
  withDivider?: boolean;
  width?: string;
  onChange: ({ title, value }: { title: string; value: string }) => void;
  value?: string;
};

const Dropdown: React.FC<DropdownProps> & { Option: React.FC<OptionProps> } = ({
  children,
  withDivider,
  width = "400px",
  onChange,
  value,
}) => {
  const [open, toggle] = useReducer((prev) => !prev, false);

  const ref = useRef<HTMLDivElement | null>(null);

  const {
    top,
    left,
    width: widthFromHook,
  } = useCoordinates(ref.current, toggle);

  return (
    <div ref={ref}>
      <div className={styles.wrapper} style={{ width }} onClick={toggle}>
        <span>{value ? value : "Choose one"}</span>
        <span>{open ? <ChevroneUp /> : <ChevronDown />}</span>
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
                    const { label, value } = child.props;

                    onChange({ title: label, value });
                    toggle();
                  },
                });
              })}
            </div>,
            document.body,
            "dropdown"
          )
        }
      </CSSTransition>
    </div>
  );
};

Dropdown.Option = Option;

export { Dropdown };
