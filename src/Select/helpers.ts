import { BaseSelectOption } from "./types";

export const getStatus = <Option extends BaseSelectOption>(
  multiple: boolean,
  id: string | number,
  value?: Option | Option[]
) => {
  if (multiple && Array.isArray(value)) {
    return value.some((el) => el.id === id);
  }

  return Array.isArray(value)
    ? value.some((el) => el.id === id)
    : value?.id === id;
};
