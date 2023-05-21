import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enrollScreen.module.scss";
import "react-quill/dist/quill.snow.css";
import React from "react";
import dynamic from "next/dynamic";
import { quillFormats } from ".src/util/textEditor";
import useEnroll from ".src/hooks/enroll/useEnroll";
import ChevronDn from ".assets/icons/ChevronDn.svg";
import CellPhoneBlue from ".assets/icons/CellPhoneBlue.svg";
import PcBlue from ".assets/icons/PcBlue.svg";
import PopupBg from ".src/components/common/popupBg";
import SelCategoryPopup from ".src/components/enroll/selCategoryPopup";
import ErrorMsgPopup from ".src/components/common/errorMsgPopup";
import SelImgPopup from ".src/components/common/selImgPopup";
import RecentTagPopup from ".src/components/enroll/recentTagPopup";
import DraftsPopup from ".src/components/enroll/draftsPopup";
import ConfirmPopup from ".src/components/common/confirmPopup";

export default function EnrollScreen() {
  const quillRef = React.useRef<any>(false);
  const useEnrollHook = useEnroll(quillRef);

  function onSubmit() {}

  return (
    <>
      <EnrollHeader useEnrollHook={useEnrollHook} />

      <section className={styles.innerSec}>
        <article
          className={`${styles.contArea} ${
            useEnrollHook.mobileView ? styles.mobile : ""
          }`}
        >
          <form id="enrollForm" onSubmit={useEnrollHook.handleSubmit(onSubmit)}>
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
                      <p>#{v}</p>
                    </li>
                  ))}
                </ul>
              )}

              <span className={styles.inputBox}>
                <input
                  disabled={useEnrollHook.watch("tagList")?.length >= 10}
                  {...useEnrollHook.register("tag")}
                  onKeyDown={useEnrollHook.handleKeyDown}
                  placeholder="# 멘션할 태그를 입력해주세요(최대 10개)"
                  onChange={(e) =>
                    useEnrollHook.handleTagOnChange(e.target.value)
                  }
                />

                {useEnrollHook.watch("tag")?.length > 0 && (
                  <RecentTagPopup useEnrollHook={useEnrollHook} />
                )}
              </span>
            </div>
          </form>
        </article>

        <button
          className={styles.phoneScreenBtn}
          onClick={() => useEnrollHook.setMobileView(!useEnrollHook.mobileView)}
        >
          <p>{useEnrollHook.mobileView ? "PC 화면" : "모바일 화면"}</p>

          <span className={styles.imgBox}>
            {useEnrollHook.mobileView ? <PcBlue /> : <CellPhoneBlue />}
          </span>
        </button>
      </section>

      {useEnrollHook.errMsg && (
        <>
          <ErrorMsgPopup
            msg={useEnrollHook.errMsg}
            confirmFunc={() => useEnrollHook.closeErrMsg()}
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

      {useEnrollHook.draftsPopup && (
        <>
          <DraftsPopup
            useEnrollHook={useEnrollHook}
            off={() => useEnrollHook.setDraftsPopup(false)}
          />
          <PopupBg bg off={() => useEnrollHook.setDraftsPopup(false)} />
        </>
      )}

      {useEnrollHook.delDraftPopup && (
        <>
          <ConfirmPopup
            title="임시저장글을 삭제하시겠습니까?"
            content={`선택한 임시저장글을 삭제하면
다시 불러올 수 없습니다.`}
            cancelFunc={() => useEnrollHook.setDelDraftPopup(false)}
            confirmFunc={() => useEnrollHook.setDelDraftPopup(false)}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEnrollHook.setDelDraftPopup(false)}
          />
        </>
      )}

      {useEnrollHook.loadDraftPopup && (
        <>
          <ConfirmPopup
            title="선택한 글을 불러오시겠습니까?"
            content={`임시글을 불러오면 작성 중인 글은
사라집니다.`}
            cancelFunc={() => useEnrollHook.setLoadDraftPopup(false)}
            confirmFunc={() => {
              useEnrollHook.setDraftsPopup(false);
              useEnrollHook.setLoadDraftPopup(false);
            }}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEnrollHook.setLoadDraftPopup(false)}
          />
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
