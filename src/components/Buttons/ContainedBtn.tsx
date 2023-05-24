import styles from "./ContainedBtn.module.scss";
interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ContainedBtn = ({
  text,
  disabled = false,
  onClick = () => undefined,
}: Props) => {
  return (
    <button
      className={styles.containedBtn}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ContainedBtn;
