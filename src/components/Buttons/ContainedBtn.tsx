import styles from "./ContainedBtn.module.scss";

import { CSSProperties } from "react";

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

const ContainedBtn = ({ text, disabled = false, onClick = () => undefined, style }: Props) => {
  return (
    <button className={styles.containedBtn} disabled={disabled} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default ContainedBtn;
