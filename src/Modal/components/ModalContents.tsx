import { FC } from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalPosition } from "../types";
import { getClassName } from "./utlils";
import styles from "./styles.module.css";
import "../animation.css";
type ModalContentProps = {
  modalPosition: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
  onClose: VoidFunction;
};

export const ModalContent: FC<ModalContentProps> = ({
  modalPosition,
  header,
  content,
  onClose,
}) => {
  const { contentStyle, wrapper } = getClassName(modalPosition);

  return (
    <div className={wrapper}>
      <div className={"overlay"} onClick={onClose}></div>
      <div className={`${contentStyle} modalContent`}>
        <ModalHeader onClose={onClose} />
        <div className={styles.contentContainer}>
          <div>
            {typeof header === "string" ? <span>{header}</span> : header}
          </div>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
};
