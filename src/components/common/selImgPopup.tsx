import styles from "./selImgPopup.module.scss";

interface Iprops {
  useEnrollHook: any;
}

export default function SelImgPopup({ useEnrollHook }: Iprops) {
  return (
    <section className={styles.selImgPopup}>
      <ul className={styles.btnList}>
        <li onClick={useEnrollHook.handleOnClickSetThumbnailBtn}>
          <p>대표이미지로 지정</p>
        </li>

        <li
          className={styles.red}
          onClick={useEnrollHook.handleOnClickDelImgBtn}
        >
          <p>삭제하기</p>
        </li>
      </ul>
    </section>
  );
}
