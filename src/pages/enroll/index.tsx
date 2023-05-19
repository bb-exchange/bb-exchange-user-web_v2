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
import SelImgPopup from ".src/components/common/selImgPopup";

export default function Enroll() {
  const quillRef = React.useRef<any>(false);
  const useEnrollHook = useEnroll(quillRef);

  function onSubmit() {}

  return (
    <>
      <EnrollHeader
        isValid={useEnrollHook.formState.isValid}
        setErrMsgBusy={useEnrollHook.setErrMsgBusy}
      />

      <section className={styles.innerSec}>
        <article className={styles.contArea}>
          <form
            id="enrollForm"
            className={styles.editCont}
            onSubmit={useEnrollHook.handleSubmit(onSubmit)}
          >
            <div className={styles.topBar}>
              <div className={styles.categoryBox}>
                <button
                  type="button"
                  className={styles.selBtn}
                  onClick={() => useEnrollHook.setSelCategoryPopup(true)}
                >
                  <input
                    disabled
                    {...useEnrollHook.register("category", {
                      required: "카테고리를 선택해주세요",
                    })}
                    placeholder="카테고리를 선택해주세요"
                  />

                  <ChevronDn />
                </button>

                {useEnrollHook.selCategoryPopup && (
                  <>
                    <SelCategoryPopup
                      value={useEnrollHook.watch("category")}
                      setValue={(v: string) =>
                        useEnrollHook.setValue("category", v)
                      }
                      off={() => useEnrollHook.setSelCategoryPopup(false)}
                    />
                    <PopupBg
                      off={() => useEnrollHook.setSelCategoryPopup(false)}
                    />
                  </>
                )}
              </div>

              <div className={styles.titleBox}>
                <input
                  {...useEnrollHook.register("title", {
                    required: "제목을 입력해주세요",
                    maxLength: { value: 40, message: "미정" },
                  })}
                  placeholder="제목을 입력해주세요. (최대 40자)"
                />
              </div>
            </div>

            <div
              className={styles.quillBox}
              onClick={useEnrollHook.handleOnClickQuillImg}
            >
              <ReactQuill
                className={`${styles.quill}`}
                theme="snow"
                forwardedRef={quillRef}
                formats={quillFormats}
                modules={useEnrollHook.modules}
                placeholder="나누고 싶은 나만의 비법을 적어주세요."
                value={useEnrollHook.watch("content")}
                onChange={(v: any) => useEnrollHook.setValue("content", v)}
              />
            </div>

            <div className={styles.tagBar}>
              {useEnrollHook.watch("tagList")?.length > 0 && (
                <ul className={styles.tagList}>
                  {useEnrollHook.watch("tagList").map((v, i) => (
                    <li
                      key={i}
                      onClick={() => useEnrollHook.handleOnClickTagList(v)}
                    >
                      <p>{v}</p>
                    </li>
                  ))}
                </ul>
              )}

              <span className={styles.inputBox}>
                {useEnrollHook.watch("tagList")?.length >= 5 ? null : (
                  <input
                    {...useEnrollHook.register("tag")}
                    onKeyDown={useEnrollHook.handleKeyDown}
                    placeholder="# 멘션할 태그를 입력해주세요"
                    onChange={(e) =>
                      useEnrollHook.handleTagOnChange(e.target.value)
                    }
                  />
                )}
              </span>
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

      {useEnrollHook.errMsg && (
        <>
          <ErrorMsgPopup
            msg={useEnrollHook.errMsg}
            off={() => useEnrollHook.closeErrMsg()}
          />
          <PopupBg bg off={() => useEnrollHook.closeErrMsg()} />
        </>
      )}

      {useEnrollHook.selectImg && (
        <>
          <SelImgPopup useEnrollHook={useEnrollHook} />
          <PopupBg bg off={() => useEnrollHook.setSelectImg(undefined)} />
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
