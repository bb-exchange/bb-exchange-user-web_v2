import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enroll.module.scss";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { quillFormats } from ".src/util/textEditor";
import useQuill from ".src/hooks/enroll/enroll";
import ChevronDn from ".src/asset/images/icon/ChevronDn.svg";

export default function Enroll() {
  const quillRef = React.useRef<any>(false);
  const [modules] = useQuill(quillRef);

  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState();

  return (
    <>
      <EnrollHeader />

      <section className={styles.innerSec}>
        <article className={styles.contArea}>
          <div className={styles.editCont}>
            <div className={styles.topBar}>
              <div className={styles.categoryBox}>
                <button className={styles.selBtn} onClick={() => {}}>
                  <input
                    disabled
                    value={category}
                    placeholder="카테고리를 선택해주세요"
                  />

                  <ChevronDn />
                </button>
              </div>

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
