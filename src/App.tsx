import { useState } from "react";
import "./App.css";
import { Modal } from "./Modal/Modal";
import { ModalPosition } from "./Modal/types";

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
        modalPosition={ModalPosition.left}
        header={"Header"}
        content={<span>Content text</span>}
      />
    </div>
  );
}

export default App;
