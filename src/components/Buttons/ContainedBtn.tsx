import styles from "./ContainedBtn.module.scss";

import { CSSProperties } from "react";

import cn from "classnames";

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

const ContainedBtn = ({
  text,
  className,
  disabled = false,
  onClick = () => undefined,
  style,
}: Props) => {
  return (
    <button
      className={cn(styles.containedBtn, className)}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default ContainedBtn;
