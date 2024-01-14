import { FC, SyntheticEvent, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { ModalHeader } from "./ModalHeader";
import { ModalPosition } from "../types";

type ModalContentProps = {
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
  openModalsArray: VoidFunction[];
};

export const ModalContent: FC<ModalContentProps> = ({
  onClose,
  modalPosition,
  header,
  content,
  openModalsArray,
}) => {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const keyCloseModal = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Escape") {
        // onClose();
        const closeModal = openModalsArray.pop();
        closeModal?.();
      }
    };
    document.addEventListener("keydown", keyCloseModal);

    return () => {
      document.removeEventListener("keydown", keyCloseModal);
    };
  }, [onClose, openModalsArray]);

  const closeWrapper = (e: SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    e.stopPropagation();
    if (target.id === "Modal") {
      onClose();
    }
  };

  const className = (position?: ModalPosition) => {
    switch (position) {
      case ModalPosition.bottom:
        return {
          contentStyle: styles.bottomModal,
          wrapper: styles.bottomModalWrapper,
        };
      case ModalPosition.right:
        return {
          contentStyle: styles.rightModal,
          wrapper: styles.rightModalWrapper,
        };
      case ModalPosition.left:
        return {
          contentStyle: styles.lefttModal,
          wrapper: styles.lefttModalWrapper,
        };

      case ModalPosition.top:
        return {
          contentStyle: styles.topModal,
          wrapper: styles.topModalWrapper,
        };

      default:
        return {
          contentStyle: styles.centerModal,
          wrapper: styles.centerModalWrapper,
        };
    }
  };

  const { contentStyle, wrapper } = className(modalPosition);

  return (
    <div className={wrapper} onClick={closeWrapper} ref={ref} id="Modal">
      <div className={contentStyle}>
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
