import { BaseSelectOption } from "../types";
import { Item } from "./Item";
import { Spinner } from "../../share/Spinner/Spinner";
import { getStatus } from "../helpers";

export interface ListItemsProps<
  Option extends BaseSelectOption,
  Multiple extends boolean = false
> {
  value?: Multiple extends true ? Option[] : Option;
  options: Option[];
  onChange: (selectedOption?: Option[] | Option) => void;
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

  const filterArr = options.filter((el) => {
    if (el.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
  });

  if (renderOptions) {
    return filterArr.map(renderOptions);
  }

  return filterArr.map((el) => {
    const { id, title } = el as Option;
    const isActive = getStatus(multiple, id, value);

    return (
      <Item
        key={id + "" + value}
        onChange={() => {
          if (multiple) {
            if (Array.isArray(value)) {
              const resultArray = isActive
                ? value.filter((el) => el.id !== id)
                : [...value, el];

              onChange(resultArray);
            } else {
              onChange([el]);
            }
          } else {
            const selectedEl = isActive ? undefined : el;

            onChange(selectedEl);
          }
        }}
        isActive={isActive}
      >
        {title}
      </Item>
    );
  });
};
