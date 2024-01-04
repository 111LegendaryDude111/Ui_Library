import { createPortal } from "react-dom";
import { ModalContent } from "./components/ModalContents";
import { FC } from "react";
import { ModalPosition } from "./types";

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
            />,
            document.getElementById("root")!,
            "modal"
          )}
        </div>
      )}
    </>
  );
};
