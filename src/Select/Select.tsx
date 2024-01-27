import { FC, useRef, useState } from "react";
import { SelectOption } from "./types";
import { ListItems } from "./components/ListItems";
import { useCoordinates } from "../hooks/useCoordinates";
import "./animation.css";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { IconCross } from "./components/Cross";
import styles from "./styles.module.css";
import { ChevroneUp } from "../share/ChevroneUp/ChevroneUp";
import { ChevronDown } from "../share/ChevronDown/ChevronDown";

type SelectProps = {
  options: SelectOption[];
  onChange: (arg: string) => void;
  value?: string;
  multiply?: boolean;
  renderOptions?: (option: SelectOption) => JSX.Element;
  loading?: boolean;
};

export const Select: FC<SelectProps> = ({
  options,
  onChange,
  value,
  multiply = false,
  renderOptions,
  loading,
}) => {
  const [openList, setOpenList] = useState(false);

  const clearInput = () => {
    onChange("");
    setOpenList(false);
  };

  const ref = useRef<HTMLInputElement | null>(null);

  const { top, left, width } = useCoordinates(ref.current);

  const [searchValue, setSearchValue] = useState<string>("");

  const isActive = useRef<string | undefined>(undefined);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          style={{ width: "300px" }}
          value={value ? value : searchValue}
          placeholder="Type ..."
          onChange={(e) => {
            const target = e.target;
            setSearchValue(target.value);
          }}
          onClick={() => setOpenList(true)}
        />
        <span onClick={() => setOpenList((prev) => !prev)}>
          {openList ? <ChevroneUp /> : <ChevronDown />}
        </span>

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
                onChange={(val: string) => {
                  onChange(val);
                  setSearchValue("");

                  if (!multiply) {
                    setOpenList(false);
                  }
                }}
                value={value}
                options={options}
                renderOptions={renderOptions}
                multiply={multiply}
                loading={loading}
                searchValue={searchValue}
                isActive={isActive}
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
