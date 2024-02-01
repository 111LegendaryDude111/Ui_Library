import { BaseSelectOption } from "./types";

export const getStatus = <Option extends BaseSelectOption>(
  multiple: boolean,
  id: string | number,
  value?: Option | Option[]
) => {
  if (multiple && Array.isArray(value)) {
    const arrayofActivityId = value.map((el) => el.id);

    return arrayofActivityId.includes(id);
  }

  return Array.isArray(value)
    ? value.some((el) => el.id === id)
    : value?.id === id;
};
