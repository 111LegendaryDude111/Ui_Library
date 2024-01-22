import style from "./style.module.css";

export type OptionProps = {
  title: string;
  value?: string;
  handleValue: (selectedValue: string) => void;
  onClick?: VoidFunction;
};
export const Option: React.FC<OptionProps> = ({ title, onClick }) => {
  return (
    <div className={style.option} onClick={onClick}>
      <div>{title}</div>
    </div>
  );
};
