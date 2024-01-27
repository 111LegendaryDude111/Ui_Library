import { FC, useEffect, useRef } from "react";
import { Item } from "./Item";
import { ListItemsProps } from "./ListItems";

interface MultiplySelectProps extends ListItemsProps {
  isActive: React.MutableRefObject<string | undefined>;
}

export const MultiplySelect: FC<MultiplySelectProps> = ({
  value,
  options,
  isActive,
  onChange,
  // searchValue,
}) => {
  const allTittles = useRef<string[]>([]);

  useEffect(() => {
    if (value) {
      allTittles.current.push(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const filterArr = options.filter((el) => {
  //   if (!value || !lastValue.current) {
  //     return true;
  //   }

  //   const lastWord = value.split(",").pop();

  //   if (el.title.includes(String(lastWord)) && !!lastWord) {
  //     return true;
  //   }

  //   return false;
  // });

  return options.map(({ id, title, value }) => {
    return (
      <Item
        key={title + value}
        value={value}
        onChange={() => {
          if (isActive.current) {
            isActive.current = `${isActive.current}, ${id}`;
          } else {
            isActive.current = id;
          }

          allTittles.current.push(title);

          onChange(allTittles.current.toString());
        }}
        isActive={!!isActive.current?.includes(id)}
      >
        {title}
      </Item>
    );
  });
};
