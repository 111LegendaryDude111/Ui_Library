import { FC, useState } from "react";
import "./App.css";
import { Modal } from "./Modal/Modal";
import { ModalPosition } from "./Modal/types";
import { Dropdown } from "./Dropdown/Dropdown";
import { Tooltip, TooltipPosition } from "./Tooltip/Tooltip";
import { Select } from "./Select/Select";

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
        modalPosition={ModalPosition.right}
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
        modalPosition={ModalPosition.left}
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

  const handleSelect = (selectedValue: string) => {
    console.log(`Выбрана опция: ${selectedValue}`);
  };

  const options = [
    { label: "option1", value: "Опция 1" },
    { label: "option2", value: "Опция 2" },
    { label: "option3", value: "Опция 3" },
    { label: "option4", value: "Опция 4" },
    { label: "option5", value: "Опция 5" },
    { label: "option6", value: "Опция 6" },
    { label: "option7", value: "Опция 7" },
    { label: "option8", value: "Опция 8" },
    { label: "option9", value: "Опция 9" },
  ];

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
      <div>
        <h4>Select</h4>
        <Select
          options={options.map((el) => {
            return {
              title: el.label,
              value: el.value,
            };
          })}
        />
      </div>
      <div>
        <Dropdown withDivider={true}>
          {options.map(({ label, value }) => {
            return (
              <Dropdown.Option
                key={value}
                value={value}
                title={label}
                handleValue={handleSelect}
              />
            );
          })}
        </Dropdown>
      </div>
      <Tooltip
        position={TooltipPosition.top}
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
