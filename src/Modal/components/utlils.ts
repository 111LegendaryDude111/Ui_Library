import { ModalPosition } from "../types";
import styles from "./styles.module.css";

export const getClassName = (position: ModalPosition) => {
  switch (position) {
    case ModalPosition.bottom:
      return {
        contentStyle: styles.bottomModal,
        wrapper: styles.bottomModalWrapper,
      };
    case ModalPosition.right:
      return {
        contentStyle: styles.rightModal,
        wrapper: styles.rightModalWrapper,
      };
    case ModalPosition.left:
      return {
        contentStyle: styles.leftModal,
        wrapper: styles.leftModalWrapper,
      };

    case ModalPosition.top:
      return {
        contentStyle: styles.topModal,
        wrapper: styles.topModalWrapper,
      };

    default:
      return {
        contentStyle: styles.centerModal,
        wrapper: styles.centerModalWrapper,
      };
  }
};
