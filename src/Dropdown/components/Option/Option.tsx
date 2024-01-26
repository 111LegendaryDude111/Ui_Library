import style from "./style.module.css";

export type OptionProps = {
  title: string;
  value?: string;
  onClick?: VoidFunction;
  children?: JSX.Element;
};
export const Option: React.FC<OptionProps> = ({ title, onClick, children }) => {
  return (
    <div className={style.option} onClick={onClick}>
      <div>{title}</div>
      {children}
    </div>
  );
};
