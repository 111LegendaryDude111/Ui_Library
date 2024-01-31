import { useEffect, useRef } from "react";
import { Item } from "./Item";
import { BaseSelectOption } from "../types";

export interface MultiplySelectProps<Option extends BaseSelectOption> {
  value?: Option[];
  options: Option[];
  onChange: (selectedOption: Option[]) => void;
  searchValue: string;
}
export const MultiplySelect = <Option extends BaseSelectOption>({
  value,
  options,
  onChange,
  searchValue,
}: MultiplySelectProps<Option>) => {
  const allValues = useRef<Option[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      allValues.current = value;
    } else if (typeof value === "object") {
      allValues.current.push(value);
    }

    return () => {
      allValues.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterArr = options.filter((el) => {
    if (!searchValue) {
      return true;
    }

    if (el.title.toLowerCase().includes(searchValue)) {
      return true;
    }
  });

  return filterArr.map((element) => {
    const { id, title } = element;
    const activeId = allValues.current.map((el) => el.id);
    const isActive = activeId.includes(id);
    return (
      <Item
        key={title + id}
        onChange={() => {
          if (isActive) {
            allValues.current = allValues.current.filter((el) => el.id !== id);
          } else {
            allValues.current.push(element);
          }

          onChange([...allValues.current]);
        }}
        isActive={isActive}
      >
        {title}
      </Item>
    );
  });
};
