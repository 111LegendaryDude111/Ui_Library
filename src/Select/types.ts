export type BaseSelectOption = {
  id: string | number;
  title: string;
};

export interface SelectProps<
  Option extends BaseSelectOption,
  Multiple extends boolean = false
> {
  value?: Multiple extends true ? Option[] : Option;
  options: Option[];
  onChange: (
    selectedOption?: Multiple extends true ? Option[] : Option
  ) => void;
  multiple?: Multiple;
  renderOptions?: (option: Option) => JSX.Element;
  loading?: boolean;
}
