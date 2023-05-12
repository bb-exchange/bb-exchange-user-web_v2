import Link from "next/link";
import styles from "./styles/OutlinedBtn.module.scss";
interface Props {
  text: string;
}

const OutlinedBtn = ({ text }: Props) => {
  return (
    // <Link href={""}>
    <button className={styles.outlinedBtn}>{text}</button>
    // </Link>
  );
};

export default OutlinedBtn;
