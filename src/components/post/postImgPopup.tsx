import styles from "./postImgPopup.module.scss";

interface Iprops {
  imgUrl: string;
}

export default function PostImgPopup({ imgUrl }: Iprops) {
  return <img className={styles.postImgPopup} src={imgUrl} alt="" />;
}
