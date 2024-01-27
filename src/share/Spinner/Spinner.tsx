import { FC } from "react";
import styles from "./spinner.module.css";

export const Spinner: FC = () => {
  return (
    <>
      <div>Loading....</div>
      <div className={styles.loader}></div>
    </>
  );
};
