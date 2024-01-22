export const getValue = ({
  selectedValue,
  inputValue,
}: {
  selectedValue: string | null;
  inputValue: string | null;
}) => {
  if (!selectedValue && !inputValue) {
    return undefined;
  }

  if (selectedValue) {
    return selectedValue;
  }

  if (!selectedValue && inputValue) {
    return inputValue;
  }
};
