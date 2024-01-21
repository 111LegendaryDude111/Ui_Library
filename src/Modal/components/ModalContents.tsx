import { FC } from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalPosition } from "../types";
import { getClassName } from "./utlils";
import styles from "./styles.module.css";
import "../styles.css";
import { LayerManager } from "../../LayerManager";
type ModalContentProps = {
  modalPosition: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
};

export const ModalContent: FC<ModalContentProps> = ({
  modalPosition,
  header,
  content,
}) => {
  const closeModal = () => {
    LayerManager.callFn();
  };

  const { contentStyle, wrapper } = getClassName(modalPosition);

  return (
    <>
      <div className={wrapper}>
        <div className={styles.overlay} onClick={closeModal}></div>
        <div className={contentStyle}>
          <ModalHeader onClose={closeModal} />
          <div className={styles.contentContainer}>
            <div>
              {typeof header === "string" ? <span>{header}</span> : header}
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
