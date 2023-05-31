import Link from "next/link";
import styles from "./OutlinedBtn.module.scss";
interface Props {
  text: string;
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const OutlinedBtn = ({
  text,
  type = "blue",
  onClick = () => undefined,
}: Props) => {
  return (
    <>
      {type === "gray" ? (
        <button
          className={`${styles.outlinedBtn} ${styles.outlinedBtn_gray}`}
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <>
          <button className={styles.outlinedBtn} onClick={onClick}>
            {text}
          </button>
        </>
      )}
    </>
  );
};

export default OutlinedBtn;
