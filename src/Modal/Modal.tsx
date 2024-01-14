import { createPortal } from "react-dom";
import { ModalContent } from "./components/ModalContents";
import { FC, useEffect } from "react";
import { ModalPosition } from "./types";

type ModalProps = {
  isVisible: boolean;
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
  header: JSX.Element | string;
  content: JSX.Element;
};

const openModalsArray: VoidFunction[] = [];

export const Modal: FC<ModalProps> = ({
  onClose,
  isVisible,
  modalPosition = ModalPosition.center,
  header,
  content,
}) => {
  useEffect(() => {
    if (isVisible) {
      openModalsArray.push(onClose);
    }
  }, [isVisible, onClose]);

  return (
    <>
      {isVisible && (
        <div>
          {createPortal(
            <ModalContent
              onClose={onClose}
              modalPosition={modalPosition}
              header={header}
              content={content}
              openModalsArray={openModalsArray}
            />,
            document.getElementById("root")!,
            "modal"
          )}
        </div>
      )}
    </>
  );
};
