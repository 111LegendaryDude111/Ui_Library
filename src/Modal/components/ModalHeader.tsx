import { FC } from "react";
import styles from "./styles.module.css";

export const ModalHeader: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  return (
    <div className={styles.headerWrapper}>
      <span onClick={onClose} style={{ padding: "0  20px 0 " }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
          id="IconChangeColor"
          data-darkreader-inline-fill=""
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            id="mainIconPathAttribute"
            stroke="#000000"
            data-darkreader-inline-stroke=""
            fill="#000000"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
      </span>
    </div>
  );
};
