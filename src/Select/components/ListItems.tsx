import { FC } from "react";
import { Option } from "../types";
import { Item } from "./Item";

type ListItemsProps = {
  inputValue?: string;
  filterArr: Option[];
  options: Option[];
  selectValue: (val: string) => void;
};

export const ListItems: FC<ListItemsProps> = ({
  inputValue,
  filterArr,
  options,
  selectValue,
}) => {
  return inputValue
    ? filterArr.map(({ title, value }) => {
        return (
          <Item key={title + value} value={value} selectValue={selectValue}>
            {title}
          </Item>
        );
      })
    : options.map(({ title, value }) => {
        return (
          <Item key={title + value} value={value} selectValue={selectValue}>
            {title}
          </Item>
        );
      });
};
