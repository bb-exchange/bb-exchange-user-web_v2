import { useRouter } from "next/router";
import styles from "./editHeader.module.scss";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import Undo from ".assets/icons/Undo.svg";
import Redo from ".assets/icons/Redo.svg";

interface Iprops {
  useEnrollHook: any;
}

export default function EditHeader({ useEnrollHook }: Iprops) {
  const router = useRouter();

  return (
    <header className={styles.editHeader}>
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
            onClick={() => useEnrollHook.setErrMsgBusy(false)}
          >
            수정하기
          </button>
        </article>
      </section>

      <section id="toolbar" className={`${styles.toolBar} ${styles.toolBar2}`}>
        <span className="ql-formats">
          <select
            className={`ql-header ${styles.selectBox} ${styles.selectTextBox}`}
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option selected />
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-blockquote" />

          <button className="ql-list" value="ordered" />

          <button className="ql-list" value="bullet" />

          <select className="ql-align">
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
          >
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="orange" />
            <option value="violet" />
            <option value="#d0d1d2" />
            <option selected />
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
