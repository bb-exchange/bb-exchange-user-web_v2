import { useRouter } from "next/router";
import styles from "./enrollHeader.module.scss";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import Undo from ".assets/icons/Undo.svg";
import Redo from ".assets/icons/Redo.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";

interface Iprops {
  useEnrollHook: ReturnType<typeof useEnroll>;
}

export default function EnrollHeader({ useEnrollHook }: Iprops) {
  const router = useRouter();

  console.log(useEnrollHook.formState.isValid);
  console.log(useEnrollHook.errMsg);
  return (
    <header className={styles.enrollHeader}>
      <section className={styles.saveBar}>
        <article className={styles.leftArea}>
          <button className={styles.logoBtn} onClick={() => router.push("/")}>
            <LogoBlue />
          </button>
        </article>

        <article className={styles.rightArea}>
          <div className={styles.tempSaveBox}>
            <button className={styles.tempSaveBtn2} onClick={() => {}}>
              임시 2
            </button>
            <button
              className={styles.tempSaveBtn1}
              onClick={() => useEnrollHook.setDraftsPopup(true)}
            >
              임시저장
            </button>
          </div>

          <button
            type="submit"
            form="enrollForm"
            className={`${styles.enrollBtn} ${
              useEnrollHook.formState.isValid ? "" : styles.disabled
            }`}
            onClick={useEnrollHook.onClickEnrollBtn}
          >
            게시하기
          </button>
        </article>
      </section>

      <section id="toolbar" className={`${styles.toolBar} ${styles.toolBar2}`}>
        <span className="ql-formats">
          <select
            className={`ql-header ${styles.selectBox} ${styles.selectTextBox}`}
            onChange={(e) => e.persist()}
            defaultValue=""
          >
            <option value="1" />
            <option value="2" />
            <option value="" />
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-blockquote" />

          <button className="ql-list" value="ordered" />

          <button className="ql-list" value="bullet" />

          <select className="ql-align" defaultValue="">
            <option value="" />
            <option value="center" />
            <option value="right" />
            <option value="justify" />
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-bold" />

          <button className="ql-italic" />

          <button className="ql-underline" />

          <select
            className={`ql-color ${styles.selectBox} ${styles.selectIconBox}`}
            defaultValue=""
          >
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="orange" />
            <option value="violet" />
            <option value="#d0d1d2" />
            <option value="" />
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-undoBtn">
            <Undo />
          </button>

          <button className="ql-redoBtn">
            <Redo />
          </button>
        </span>

        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
        </span>
      </section>
    </header>
  );
}
