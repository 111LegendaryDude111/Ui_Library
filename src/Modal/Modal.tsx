import { ModalContent } from "./components/ModalContents";
import { FC, useEffect } from "react";
import { ModalPosition } from "./types";
import { useEvent } from "../hooks/useEvent";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import "./styles.css";

type ModalProps = {
  isVisible: boolean;
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
};

const openModalsArray: VoidFunction[] = [];

// window.openModalsArray = openModalsArray;

export const Modal: FC<ModalProps> = ({
  onClose,
  isVisible,
  modalPosition = ModalPosition.center,
  header,
  content,
}) => {
  const close = useEvent(onClose);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    openModalsArray.push(close);
  }, [close, isVisible]);

  useEffect(() => {
    const keyCloseModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const close = openModalsArray.pop();
        close?.();
      }
    };

    document.addEventListener("keydown", keyCloseModal);

    return () => {
      document.removeEventListener("keydown", keyCloseModal);
    };
  }, []);

  const classNames =
    modalPosition === ModalPosition.center
      ? "centerModal"
      : modalPosition === ModalPosition.left
      ? "leftModal"
      : modalPosition === ModalPosition.right
      ? "rightModal"
      : modalPosition === ModalPosition.top
      ? "topModal"
      : "bottomModal";

  return createPortal(
    <CSSTransition
      in={isVisible}
      unmountOnExit
      timeout={300}
      classNames={classNames}
    >
      <ModalContent
        modalPosition={modalPosition}
        header={header}
        content={content}
        openModalsArray={openModalsArray}
      />
    </CSSTransition>,
    document.getElementById("modal")!,
    "modal"
  );
};
