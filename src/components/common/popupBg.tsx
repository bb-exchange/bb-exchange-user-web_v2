import styles from "./popupBg.module.scss";

interface IProps {
  bg?: boolean;
  opacity?: number;
  zIndex?: number;
  off: React.MouseEventHandler<HTMLButtonElement>;
}

export default function PopupBg({ bg, opacity = 0.4, zIndex, off }: IProps) {
  return (
    <section
      className={`${styles.popupBg} ${bg ? styles.bg : ""}`}
      style={{ opacity, zIndex }}
      onClick={off}
    />
  );
}
