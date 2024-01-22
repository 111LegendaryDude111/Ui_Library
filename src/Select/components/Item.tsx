import { FC } from "react";

type ItemProps = {
  children: JSX.Element | string;
  value: string;
  selectValue: (val: string) => void;
};

export const Item: FC<ItemProps> = ({ children, selectValue, value }) => {
  return (
    <div
      onClick={() => {
        selectValue(value);
      }}
      style={{
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};
