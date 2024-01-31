import { useRef, useState, useEffect, useLayoutEffect } from "react";

interface UseInputSearchProps {
  multiple: boolean;
  openList: boolean;
  setSearchValue: (value: React.SetStateAction<string>) => void;
  loading?: boolean;
}
export const useInputSearchProps = ({
  multiple,
  openList,
  setSearchValue,
  loading,
}: UseInputSearchProps) => {
  const searInputRef = useRef<HTMLInputElement | null>(null);
  const [isOpenSearchInput, setIsOpenSearchInput] = useState(false);
  const test = useRef({ multiple, openList, loading, isOpenSearchInput });

  useLayoutEffect(() => {
    test.current.multiple = multiple;
    test.current.loading = loading;
    test.current.isOpenSearchInput = isOpenSearchInput;
    test.current.openList = openList;
  });

  useEffect(() => {
    const keyPressRegister = (e: KeyboardEvent) => {
      const { multiple, openList, loading, isOpenSearchInput } = test.current;
      // console.log(test.current);
      if (!multiple || !openList || loading) return;

      if (isOpenSearchInput && searInputRef.current) {
        console.log(searInputRef.current);

        searInputRef.current.focus();
      }

      if (!isOpenSearchInput) {
        setIsOpenSearchInput(true);
        setSearchValue(e.key);
      }
    };

    document.addEventListener("keypress", keyPressRegister);

    return () => {
      document.removeEventListener("keypress", keyPressRegister);
    };
  }, [setSearchValue]);

  return {
    searInputRef,
    isOpenSearchInput,
    setIsOpenSearchInput,
  };
};
