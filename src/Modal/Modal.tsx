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
  // const [openModalsArray, setOpenModalsArray] = useState<VoidFunction[]>([]);

  // useEffect(() => {
  //   setOpenModalsArray((prev) => [...prev, onClose]);
  // }, [onClose]);

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
              // openModalsArray={openModalsArray}
            />,
            document.getElementById("root")!,
            "modal"
          )}
        </div>
      )}
    </>
  );
};
