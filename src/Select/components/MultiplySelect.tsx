import { FC } from "react";
import { Item } from "./Item";
import { ListItemsProps } from "./ListItems";
import { useLastValue } from "../../hooks/useLastValue";

interface MultiplySelectProps extends ListItemsProps {
  isActive: React.MutableRefObject<string | undefined>;
}

export const MultiplySelect: FC<MultiplySelectProps> = ({
  value,
  options,
  isActive,
  onChange,
}) => {
  const lastValue = useLastValue<string>(value);

  const filterArr = options.filter((el) => {
    if (!value || !lastValue.current) {
      return true;
    }

    const lastWord = lastValue.current.split(",").pop();

    // console.log("value", value);
    // console.log("lastWord", lastWord);
    // console.log(
    //   "el.title.includes(String(lastWord))",
    //   el.title.includes(String(lastWord))
    // );

    if (el.title.includes(String(lastWord)) && !!lastWord) {
      return true;
    }

    return false;
  });

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

          console.log(lastValue.current);
          if (lastValue.current) {
            lastValue.current = [...lastValue.current.split(","), title + ","]
              .filter(Boolean)
              .join(",");
          } else {
            lastValue.current = `${title},`;
          }

          onChange(lastValue.current);
        }}
        isActive={!!isActive.current?.includes(id)}
      >
        {title}
      </Item>
    );
  });
};
