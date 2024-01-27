import { FC } from "react";
import { SelectOption } from "../types";
import { Item } from "./Item";
import { MultiplySelect } from "./MultiplySelect";
import { Spinner } from "../../share/Spinner/Spinner";

export interface ListItemsProps {
  value?: string;
  options: SelectOption[];
  onChange: (val: string) => void;
  searchValue: string;
  renderOptions?: (option: SelectOption) => JSX.Element;
  multiply?: boolean;
  loading?: boolean;
  isActive: React.MutableRefObject<string | undefined>;
}

export const ListItems: FC<ListItemsProps> = ({
  value,
  options,
  onChange,
  renderOptions,
  multiply,
  loading,
  searchValue,
  isActive,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (renderOptions) {
    return options.map(renderOptions);
  }

  if (multiply) {
    return (
      <MultiplySelect
        value={value}
        isActive={isActive}
        options={options}
        onChange={onChange}
        searchValue={""}
      />
    );
  }

  const filterArr = options.filter((el) => {
    if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
  });

  return filterArr.map(({ id, title, value }) => {
    return (
      <Item
        key={title + value}
        value={value}
        onChange={() => {
          isActive.current = id;
          onChange(title);
        }}
        isActive={isActive.current === id}
      >
        {title}
      </Item>
    );
  });
};
