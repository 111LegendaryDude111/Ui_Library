import { useRef, useState } from "react";
import { BaseSelectOption, SelectProps } from "./types";
import { ListItems } from "./components/ListItems";
import { useCoordinates } from "../hooks/useCoordinates";
import "./animation.css";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { IconCross } from "./components/Cross";
import styles from "./styles.module.css";
import { ChevroneUp } from "../share/ChevroneUp/ChevroneUp";
import { ChevronDown } from "../share/ChevronDown/ChevronDown";

export const Select = <
  Option extends BaseSelectOption,
  Multiple extends boolean = false
>(
  props: SelectProps<Option, Multiple>
) => {
  const {
    value,
    options,
    onChange,
    multiple = false,
    renderOptions,
    loading,
  } = props;
  const [openList, setOpenList] = useState(false);

  const clearInput = () => {
    if (multiple) {
      onChange([] as unknown as Multiple extends true ? Option[] : Option);
      setSearchValue("");
    } else {
      onChange(undefined);
    }

    setOpenList(false);
  };

  const ref = useRef<HTMLInputElement | null>(null);
  const inputWrapper = useRef<HTMLDivElement | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");

  const inputValue = Array.isArray(value) ? "" : value ? value.title : "";

  const { bottom, left, width } = useCoordinates(inputWrapper.current, () => {
    setOpenList(false);
  });

  return (
    <>
      <div className={styles.inputWrapper}>
        <div className={styles.mainInputWrapper} ref={inputWrapper}>
          {multiple && (
            <div className={styles.multipleTitle}>
              {Array.isArray(value)
                ? value.map((el) => el.title).join(", ")
                : value?.title}
            </div>
          )}
          <div className={styles.inputBlock}>
            <input
              ref={ref}
              className={styles.inputStyle}
              value={searchValue ?? inputValue}
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
        </div>
      </div>
      <CSSTransition
        in={openList}
        unmountOnExit
        timeout={300}
        classNames={"selectItemsWrapper"}
      >
        {() =>
          createPortal(
            <div
              className="selectItemsWrapper"
              style={{ top: bottom ? bottom - 40 : bottom, left, width }}
            >
              <ListItems
                value={value}
                options={options}
                renderOptions={renderOptions}
                multiple={multiple}
                loading={loading}
                searchValue={searchValue}
                onChange={(selectOption) => {
                  setSearchValue("");
                  onChange(selectOption);
                  // setOpenList(false);
                }}
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
