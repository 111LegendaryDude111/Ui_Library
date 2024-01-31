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
import { useInputSearchProps } from "./hooks/useInputSerchProps";

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
      setIsOpenSearchInput(false);
      setSearchValue("");
    } else {
      onChange(undefined);
    }

    setOpenList(false);
  };

  const ref = useRef<HTMLInputElement | null>(null);

  const { top, left, width } = useCoordinates(ref.current);

  const [searchValue, setSearchValue] = useState<string>("");

  const inputValue = Array.isArray(value)
    ? value.map((el) => el.title).toString()
    : value
    ? value.title
    : "";

  const { isOpenSearchInput, searInputRef, setIsOpenSearchInput } =
    useInputSearchProps({
      multiple,
      setSearchValue,
      openList,
      loading,
    });

  return (
    <>
      <div className={styles.inputWrapper}>
        {isOpenSearchInput && openList && (
          <input
            ref={searInputRef}
            style={{ width: "200px" }}
            value={searchValue}
            placeholder="Search..."
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
        )}
        <div className={styles.mainInputWrapper}>
          <input
            ref={ref}
            style={{ width: "300px" }}
            value={inputValue}
            placeholder="Type ..."
            onChange={(e) => {
              if (multiple) {
                searInputRef.current?.focus();
                return;
              }

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
                value={value}
                options={options}
                renderOptions={renderOptions}
                multiple={multiple}
                loading={loading}
                searchValue={searchValue}
                onChange={(selectOption) => {
                  setSearchValue("");
                  onChange(
                    selectOption as Multiple extends true ? Option[] : Option
                  );
                  setIsOpenSearchInput(false);

                  if (!multiple) {
                    setOpenList(false);
                  }
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
