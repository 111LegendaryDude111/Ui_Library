import { FC, SyntheticEvent, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { ModalHeader } from "./ModalHeader";
import { ModalPosition } from "../types";

type ModalContentProps = {
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
};

export const ModalContent: FC<ModalContentProps> = ({
  onClose,
  modalPosition,
}) => {
  const ref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const keyCloseModal = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", keyCloseModal);

    return () => {
      document.removeEventListener("keydown", keyCloseModal);
    };
  }, [onClose]);

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
          content: styles.bottomModal,
          wrapper: styles.bottomModalWrapper,
        };
      case ModalPosition.side:
        return {
          content: styles.sideModal,
          wrapper: styles.sideModalWrapper,
        };

      default:
        return {
          content: styles.centerModal,
          wrapper: styles.centerModalWrapper,
        };
    }
  };

  const { content, wrapper } = className(modalPosition);

  return (
    <div className={wrapper} onClick={closeWrapper} ref={ref} id="Modal">
      <div className={content}>
        <ModalHeader onClose={onClose} />
        <div className={styles.contentContainer}>
          <div>Header</div>
          <div>Content</div>
        </div>
      </div>
    </div>
  );
};
