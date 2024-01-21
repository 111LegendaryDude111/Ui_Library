import { ModalContent } from "./components/ModalContents";
import { FC, useEffect } from "react";
import { ModalPosition } from "./types";
import "./styles.css";
import { useEvent } from "../hooks/useEvent";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { LayerManager } from "../LayerManager";

type ModalProps = {
  isVisible: boolean;
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
};

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
    LayerManager.register(close);

    return () => {
      LayerManager.unregister(close);
    };
  }, [close, isVisible]);

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

  return (
    <>
      {isVisible && <div className="overlay"></div>}
      <CSSTransition
        in={isVisible}
        unmountOnExit
        timeout={300}
        classNames={classNames}
      >
        {() =>
          createPortal(
            <ModalContent
              modalPosition={modalPosition}
              header={header}
              content={content}
            />,
            document.getElementById("modal")!,
            "modal"
          )
        }
      </CSSTransition>
    </>
  );
};
