import style from "./style.module.css";

export type OptionProps = {
  value?: string;
  onClick?: VoidFunction;
  children?: JSX.Element | string;
  label?: string;
};
export const Option: React.FC<OptionProps> = ({ onClick, children }) => {
  return (
    <div className={style.option} onClick={onClick}>
      {children}
    </div>
  );
};
