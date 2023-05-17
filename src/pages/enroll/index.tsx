import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enroll.module.scss";
import "react-quill/dist/quill.snow.css";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  imgHandler,
  quillFormats,
  redoBtnHandler,
  undoBtnHandler,
} from ".src/util/textEditor";

export default function Enroll() {
  const quillRef = React.useRef<any>(false);

  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: () => imgHandler(quillRef),
          undoBtn: () => undoBtnHandler(quillRef),
          redoBtn: () => redoBtnHandler(quillRef),
        },
      },
    }),
    []
  );

  return (
    <>
      <EnrollHeader />

      <section className={styles.innerSec}>
        <article className={styles.contArea}>
          <div className={styles.editCont}>
            <div className={styles.topBar}>
              <div className={styles.titleBox}>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={40}
                  placeholder="제목을 입력해주세요. (최대 40자)"
                />
              </div>
            </div>

            <ReactQuill
              className={`${styles.quill}`}
              theme="snow"
              forwardedRef={quillRef}
              formats={quillFormats}
              modules={modules}
              value={value}
              placeholder="나누고 싶은 나만의 비법을 적어주세요."
              onChange={setValue}
            />
          </div>
        </article>
      </section>
    </>
  );
}

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const reactQuill = ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );

    return reactQuill;
  },
  {
    ssr: false,
  }
);
