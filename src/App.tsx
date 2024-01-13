import { FC, useState } from "react";
import "./App.css";
import { Modal } from "./Modal/Modal";
import { ModalPosition } from "./Modal/types";

const ContentComponent: FC = () => {
  const [isVisibleModalTwo, setIsVisibleModalTwo] = useState<boolean>(false);

  const modalHandlerTwo = () => {
    setIsVisibleModalTwo((prev) => !prev);
  };
  return (
    <div>
      <h3>Content</h3>
      <button
        onClick={modalHandlerTwo}
        style={{
          width: "300px",
        }}
      >
        openModal #2
      </button>
      <Modal
        isVisible={isVisibleModalTwo}
        onClose={modalHandlerTwo}
        modalPosition={ModalPosition.center}
        header={<h1>Header #2</h1>}
        content={<div>Content #2</div>}
      />
    </div>
  );
};

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const modalHandler = () => {
    setIsVisible((prev) => !prev);
  };
  const buttonText = isVisible ? "Close Modal" : "OpenModal";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <button
        onClick={modalHandler}
        style={{
          width: "300px",
        }}
      >
        {buttonText}
      </button>
      <Modal
        onClose={modalHandler}
        isVisible={isVisible}
        modalPosition={ModalPosition.center}
        header={"Header"}
        content={<ContentComponent />}
      />
    </div>
  );
}

export default App;
