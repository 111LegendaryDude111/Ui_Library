import { createPortal } from "react-dom";
import { ModalContent } from "./components/ModalContents";
import { FC } from "react";
import { ModalPosition } from "./types";

type ModalProps = {
  isVisible: boolean;
  onClose: VoidFunction;
  modalPosition?: ModalPosition;
};

export const Modal: FC<ModalProps> = ({
  onClose,
  isVisible,
  modalPosition = ModalPosition.center,
}) => {
  return (
    <>
      {isVisible && (
        <div>
          {createPortal(
            <ModalContent onClose={onClose} modalPosition={modalPosition} />,
            document.getElementById("root")!,
            "modal"
          )}
        </div>
      )}
    </>
  );
};
