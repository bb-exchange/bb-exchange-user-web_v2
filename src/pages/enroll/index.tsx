import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enroll.module.scss";
import "react-quill/dist/quill.snow.css";
import React from "react";
import dynamic from "next/dynamic";
import { quillFormats } from ".src/util/textEditor";
import useEnroll from ".src/hooks/enroll/enroll";
import ChevronDn from ".src/asset/images/icon/ChevronDn.svg";
import CellPhoneBlue from ".src/asset/images/icon/CellPhoneBlue.svg";
import PopupBg from ".src/components/common/popupBg";
import SelCategoryPopup from ".src/components/enroll/selCategoryPopup";
import ErrorMsgPopup from ".src/components/common/errorMsgPopup";

export default function Enroll() {
  const quillRef = React.useRef<any>(false);
  const {
    modules,
    form,
    selCategoryPopup,
    setSelCategoryPopup,
    errMsg,
    setErrMsgBusy,
    closeErrMsg,
  } = useEnroll(quillRef);

  function onSubmit() {}

  return (
    <>
      <EnrollHeader
        isValid={form.formState.isValid}
        setErrMsgBusy={setErrMsgBusy}
      />

      <section className={styles.innerSec}>
        <article className={styles.contArea}>
          <form
            id="enrollForm"
            className={styles.editCont}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className={styles.topBar}>
              <div className={styles.categoryBox}>
                <button
                  type="button"
                  className={styles.selBtn}
                  onClick={() => setSelCategoryPopup(true)}
                >
                  <input
                    disabled
                    {...form.register("category", {
                      required: "카테고리를 선택해주세요",
                    })}
                    placeholder="카테고리를 선택해주세요"
                  />

                  <ChevronDn />
                </button>

                {selCategoryPopup && (
                  <>
                    <SelCategoryPopup
                      value={form.watch("category")}
                      setValue={(v: string) => form.setValue("category", v)}
                      off={() => setSelCategoryPopup(false)}
                    />
                    <PopupBg off={() => setSelCategoryPopup(false)} />
                  </>
                )}
              </div>

              <div className={styles.titleBox}>
                <input
                  {...form.register("title", {
                    required: "제목을 입력해주세요",
                    maxLength: { value: 40, message: "미정" },
                  })}
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
              placeholder="나누고 싶은 나만의 비법을 적어주세요."
              value={form.watch("content")}
              onChange={(v: any) => form.setValue("content", v)}
            />

            <div className={styles.tagBar}>
              <input
                {...form.register("tag")}
                placeholder="# 멘션할 태그를 입력해주세요"
              />
            </div>
          </form>
        </article>

        <button className={styles.phoneScreenBtn} onClick={() => {}}>
          <p>모바일 화면</p>

          <span className={styles.imgBox}>
            <CellPhoneBlue />
          </span>
        </button>
      </section>

      {errMsg && (
        <>
          <ErrorMsgPopup msg={errMsg} off={() => closeErrMsg()} />
          <PopupBg bg off={() => closeErrMsg()} />
        </>
      )}
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
