import { FC, useMemo, useState } from "react";
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
        modalPosition={ModalPosition.top}
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
        modalPosition={ModalPosition.bottom}
        header={<h1>Header #2</h1>}
        content={<ContentComponent3 />}
      />
    </div>
  );
};

type DropdownValueType = { title: string; value: string };

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const modalHandler = () => {
    setIsVisible((prev) => !prev);
  };
  const buttonText = isVisible ? "Close Modal" : "OpenModal";

  const [value, setValue] = useState<string>();

  //generic ??
  const onChangeDropdown = ({ title, value }: DropdownValueType) => {
    console.log(`title: ${title}`);
    console.log(`value: ${value}`);

    setValue(title);
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

  /*
  <Select 
    value={}
    onChange={}
    onSearchChange={}
    multiple={true}
    options={options}
    renderOption={option => <div>{option.title}</div>}
    loading={false}
/>
*/

  const [selectValue, setSelectValue] = useState<string>();

  const onChangeSelect = (props: string) => {
    setSelectValue(props);
  };

  const selectOptions = useMemo(() => {
    return options.map((el) => {
      return {
        id: self.crypto.randomUUID(),
        title: el.label,
        value: el.value,
      };
    });
  }, []);

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
        <span style={{ fontSize: "20px", fontWeight: 600 }}>Select</span>
        <Select
          multiply={false}
          value={selectValue}
          renderOptions={(option) => (
            <div onClick={() => onChangeSelect(option.title)}>
              {option.title}
            </div>
          )}
          onChange={onChangeSelect}
          options={selectOptions}
        />
      </div>
      <div>
        <Dropdown withDivider={true} value={value} onChange={onChangeDropdown}>
          {options.map(({ label, value }, i) => {
            if (i % 2 === 0) {
              return (
                <Dropdown.Option key={value} value={value} title={label}>
                  <span>{`Content : ${label}`} </span>
                </Dropdown.Option>
              );
            }
            return <Dropdown.Option key={value} value={value} title={label} />;
          })}
        </Dropdown>
      </div>
      <Tooltip
        position={TooltipPosition.top}
        content={<span>Открывает модальное окно</span>}
      >
        {(props) => {
          return (
            <button
              onClick={modalHandler}
              style={{ width: "300px" }}
              {...props}
            >
              {buttonText}
            </button>
          );
        }}
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
