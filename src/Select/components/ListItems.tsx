import { FC, useLayoutEffect, useRef } from "react";
import { Option } from "../types";
import { Item } from "./Item";
import { MultiplySelect } from "./MultiplySelect";

export interface ListItemsProps {
  value?: string;
  options: Option[];
  onChange: (val: string) => void;
  renderOptions?: (option: Option) => JSX.Element;
  multiply?: boolean;
}

export const ListItems: FC<ListItemsProps> = ({
  value,
  options,
  onChange,
  renderOptions,
  multiply,
}) => {
  const isActive = useRef<string | undefined>(undefined);

  useLayoutEffect(() => {
    return () => {
      isActive.current = undefined;
    };
  }, []);

  if (renderOptions) {
    return options.map(renderOptions);
  }

  if (multiply) {
    return (
      <MultiplySelect
        value={value}
        isActive={isActive}
        options={options}
        onChange={onChange}
      />
    );
  }

  const filterArr = options.filter((el) => {
    if (!value) {
      return true;
    }

    if (el.title.includes(value) || el.value.includes(value)) {
      return true;
    }
  });

  return filterArr.map(({ id, title, value }) => {
    return (
      <Item
        key={title + value}
        value={value}
        onChange={() => {
          isActive.current = id;
          onChange(title);
        }}
        isActive={isActive.current === id}
      >
        {title}
      </Item>
    );
  });

  // return value
  //   ? filterArr.map(({ id, title, value }) => {
  //       return (
  //         <Item
  //           key={title + value}
  //           value={value}
  //           onChange={() => {
  //             isActive.current = id;
  //             onChange(title);
  //           }}
  //           isActive={isActive.current === id}
  //         >
  //           {title}
  //         </Item>
  //       );
  //     })
  //   : options.map(({ id, title, value }) => {
  //       return (
  //         <Item
  //           key={title + value}
  //           value={value}
  //           onChange={() => {
  //             isActive.current = id;
  //             onChange(title);
  //           }}
  //           isActive={isActive.current === id}
  //         >
  //           {title}
  //         </Item>
  //       );
  //     });
};
