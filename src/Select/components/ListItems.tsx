import { BaseSelectOption } from "../types";
import { Item } from "./Item";
import { MultiplySelect } from "./MultiplySelect";
import { Spinner } from "../../share/Spinner/Spinner";

export interface ListItemsProps<
  Option extends BaseSelectOption,
  Multiple extends boolean = false
> {
  value?: Multiple extends true ? Option[] : Option;
  options: Option[];
  onChange: (
    selectedOption?: Multiple extends true ? Option[] : Option
  ) => void;
  renderOptions?: (option: Option) => JSX.Element;
  multiple: Multiple;
  loading?: boolean;
  searchValue: string;
}

export const ListItems = <
  Option extends BaseSelectOption,
  Multiple extends boolean
>({
  value,
  options,
  onChange,
  renderOptions,
  multiple,
  loading,
  searchValue,
}: ListItemsProps<Option, Multiple>) => {
  if (loading) {
    return <Spinner />;
  }

  if (renderOptions) {
    return options.map(renderOptions);
  }

  if (multiple && value) {
    return (
      <MultiplySelect
        value={value as Option[]}
        options={options}
        onChange={onChange as (selectedOption: Option[]) => void}
        searchValue={searchValue}
      />
    );
  }

  const filterArr = options.filter((el) => {
    if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
  });

  return filterArr.map((el) => {
    const { id, title } = el as Option;
    const isActive = Array.isArray(value)
      ? value.some((el) => el.id === id)
      : value?.id === id;

    return (
      <Item
        key={id + "" + value}
        onChange={() => {
          if (isActive) {
            onChange(undefined);
          } else {
            onChange(el as Multiple extends true ? Option[] : Option);
          }
        }}
        isActive={isActive}
      >
        {title}
      </Item>
    );
  });
};
