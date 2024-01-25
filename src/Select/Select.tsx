import { FC, useRef, useState } from "react";
import { Option } from "./types";
import { ListItems } from "./components/ListItems";
import { useCoordinates } from "../hooks/useCoordinates";
import "./animation.css";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { IconCross } from "./components/Cross";
import styles from "./styles.module.css";

type SelectProps = {
  options: Option[];
};

export const Select: FC<SelectProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const [openList, setOpenList] = useState(false);

  const filterArr = options.filter((el) => {
    if (
      inputValue &&
      (el.title.includes(inputValue) || el.value.includes(inputValue))
    ) {
      return true;
    }
  });

  const selectValue = (val: string) => {
    setInputValue(val);
    setOpenList(false);
  };

  const clearInput = () => {
    setInputValue("");
    setOpenList(false);
  };
  const ref = useRef<HTMLInputElement | null>(null);

  const { top, left, width } = useCoordinates(ref.current);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          value={inputValue}
          placeholder="Type ..."
          onChange={(e) => {
            const target = e.target;

            setInputValue(target.value);
          }}
          onClick={() => {
            setOpenList(true);
          }}
        />
        <IconCross clearInput={clearInput} />
      </div>
      <CSSTransition
        in={openList}
        unmountOnExit
        timeout={300}
        classNames={"selectItemsWrapper"}
      >
        {() =>
          createPortal(
            <div className="selectItemsWrapper" style={{ top, left, width }}>
              <ListItems
                selectValue={selectValue}
                filterArr={filterArr}
                inputValue={inputValue}
                options={options}
              />
            </div>,
            document.body,
            "select"
          )
        }
      </CSSTransition>
    </>
  );
};
