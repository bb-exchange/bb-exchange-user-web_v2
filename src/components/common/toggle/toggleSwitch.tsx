import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./toggleSwitch.module.scss";
interface toggle {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  setPopup: Dispatch<SetStateAction<boolean>>;
}
const ToggleSwitch = ({ isChecked, setIsChecked, setPopup }: toggle) => {
  return (
    <div id={styles.toggleSwitch}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={isChecked ? () => setPopup(true) : () => setIsChecked(true)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
