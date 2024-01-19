import { FC, useState } from "react";
import "./App.css";
import { Modal } from "./Modal/Modal";
import { ModalPosition } from "./Modal/types";
import { Tooltip, TooltipPosition } from "./Tooltip/Tooltip";
import { Dropdown, Option } from "./Dropdown/Dropdown";

const ContentComponent3: FC = () => {
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
        openModal #3
      </button>
      <Modal
        isVisible={isVisibleModalTwo}
        onClose={modalHandlerTwo}
        modalPosition={ModalPosition.center}
        header={<h1>Header #3</h1>}
        content={<>Content #3</>}
      />
    </div>
  );
};
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
        content={<ContentComponent3 />}
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

  const options = [
    { label: "Опция 1", value: "option1" },
    { label: "Опция 2", value: "option2" },
    { label: "Опция 3", value: "option3" },
  ];

  const handleSelect = (selectedOption: Option) => {
    console.log(`Выбрана опция: ${selectedOption.label}`);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div>
        <div>Drpodown</div>
        <Dropdown options={options} onSelect={handleSelect} />
      </div> */}
      <Tooltip
        position={TooltipPosition.bottom}
        content={<span>Открывает модальное окно</span>}
      >
        <button
          onClick={modalHandler}
          style={{
            width: "300px",
          }}
        >
          {buttonText}
        </button>
      </Tooltip>
      <Modal
        isVisible={isVisible}
        onClose={modalHandler}
        modalPosition={ModalPosition.center}
        header={"Header"}
        content={<ContentComponent />}
      />
    </div>
  );
}

export default App;
