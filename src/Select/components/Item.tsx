import { FC } from "react";

type ItemProps = {
  children: JSX.Element | string;
  value: string;
  onChange: VoidFunction;
  isActive: boolean;
};

export const Item: FC<ItemProps> = ({ children, onChange, isActive }) => {
  return (
    <div
      onClick={onChange}
      style={{
        cursor: "pointer",
        backgroundColor: isActive ? "#43e0b1ef" : undefined,
      }}
    >
      {children}
    </div>
  );
};
