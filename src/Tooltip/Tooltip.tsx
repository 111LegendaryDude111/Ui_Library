import { FC, useState } from "react";
import styles from "./style.module.css";

type TooltipProps = {
  text: string;
  children: JSX.Element;
};

export const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isVisibleText, setIsVisibleText] = useState(false);
  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => {
        setIsVisibleText(true);
      }}
      onMouseLeave={() => {
        setIsVisibleText(false);
      }}
    >
      <div
        style={{
          position: "fixed",
        }}
      >
        {children}
      </div>
      {isVisibleText && (
        <span
          style={{
            padding: "10px",
            position: "relative",
            top: "30px",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};
