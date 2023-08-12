import styles from "./editScreen.module.scss";
import "react-quill/dist/quill.snow.css";
import React from "react";
import dynamic from "next/dynamic";
import { quillFormats } from ".src/util/textEditor";
import ChevronDn from ".assets/icons/ChevronDn.svg";
import CellPhoneBlue from ".assets/icons/CellPhoneBlue.svg";
import PcBlue from ".assets/icons/PcBlue.svg";
import PopupBg from ".src/components/common/popupBg";
import SelCategoryPopup from ".src/components/enroll/selCategoryPopup";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
import SelImgPopup from ".src/components/common/popup/selImgPopup";
import RecentTagPopup from ".src/components/enroll/recentTagPopup";
import DraftsPopup from ".src/components/enroll/draftsPopup";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import EditHeader from ".src/components/edit/editHeader";
import useEdit from ".src/hooks/edit/useEdit";
import { useRouter } from "next/router";
import useEnroll from ".src/hooks/enroll/useEnroll";

export default function EditScreen() {
  const router = useRouter();

  const quillRef = React.useRef<any>(false);
  const useEditHook = useEdit(quillRef);
  const useEnrollHook = useEnroll(quillRef);

  function onSubmit() {
    useEditHook.handleSubmitFunc();
  }

  return (
    <>
      <EditHeader useEditHook={useEditHook} />

      <section className={styles.innerSec}>
        <article
          className={`${styles.contArea} ${
            useEditHook.mobileView ? styles.mobile : ""
          }`}
        >
          <form id="enrollForm" onSubmit={useEditHook.handleSubmit(onSubmit)}>
            <div className={styles.topBar}>
              <div className={styles.categoryBox}>
                <button
                  type="button"
                  className={styles.selBtn}
                  onClick={() => useEditHook.setSelCategoryPopup(true)}
                >
                  <input
                    disabled
                    {...useEditHook.register("category", {
                      required: "카테고리를 선택해주세요",
                    })}
                    value={useEditHook.watch("category")?.description}
                    placeholder="카테고리를 선택해주세요"
                  />

                  <ChevronDn />
                </button>

                {useEditHook.selCategoryPopup && (
                  <>
                    <SelCategoryPopup
                      setValue={(v: IpostCategories) =>
                        useEditHook.setValue("category", v)
                      }
                      off={() => useEditHook.setSelCategoryPopup(false)}
                    />
                    <PopupBg
                      off={() => useEditHook.setSelCategoryPopup(false)}
                    />
                  </>
                )}
              </div>

              <div className={styles.titleBox}>
                <input
                  {...useEditHook.register("title", {
                    required: "제목을 입력해주세요",
                    maxLength: { value: 40, message: "미정" },
                  })}
                  placeholder="제목을 입력해주세요. (최대 40자)"
                />
              </div>
            </div>

            <div
              className={styles.quillBox}
              onClick={useEditHook.handleOnClickQuillImg}
            >
              <ReactQuill
                className={`${styles.quill}`}
                theme="snow"
                forwardedRef={quillRef}
                formats={quillFormats}
                modules={useEditHook.modules}
                placeholder="나누고 싶은 나만의 비법을 적어주세요."
                value={useEditHook.watch("content")}
                onChange={(v: any) => useEditHook.setValue("content", v)}
              />
            </div>

            <div className={styles.tagBar}>
              {useEditHook.watch("tagList")?.length > 0 && (
                <ul className={styles.tagList}>
                  {useEditHook.watch("tagList").map((v, i) => (
                    <li
                      key={i}
                      onClick={() => useEditHook.handleOnClickTagList(v)}
                    >
                      <p>#{v}</p>
                    </li>
                  ))}
                </ul>
              )}

              <span className={styles.inputBox}>
                <input
                  disabled={useEditHook.watch("tagList")?.length >= 10}
                  {...useEditHook.register("tag")}
                  onKeyDown={useEditHook.handleKeyDown}
                  placeholder="# 멘션할 태그를 입력해주세요(최대 10개)"
                  onChange={(e) =>
                    useEditHook.handleTagOnChange(e.target.value)
                  }
                />

                {useEditHook.watch("tag")?.length > 0 && (
                  <RecentTagPopup useEnrollHook={useEnrollHook} />
                )}
              </span>
            </div>
          </form>
        </article>

        <button
          className={styles.phoneScreenBtn}
          onClick={() => useEditHook.setMobileView(!useEditHook.mobileView)}
        >
          <p>{useEditHook.mobileView ? "PC 화면" : "모바일 화면"}</p>

          <span className={styles.imgBox}>
            {useEditHook.mobileView ? <PcBlue /> : <CellPhoneBlue />}
          </span>
        </button>
      </section>

      {useEditHook.errMsg && (
        <>
          <ErrorMsgPopup
            msg={useEditHook.errMsg}
            confirmFunc={() => useEditHook.closeErrMsg()}
          />
          <PopupBg bg off={() => useEditHook.closeErrMsg()} />
        </>
      )}

      {useEditHook.selectImg && (
        <>
          <SelImgPopup useEnrollHook={useEnrollHook} />
          <PopupBg bg off={() => useEditHook.setSelectImg(undefined)} />
        </>
      )}

      {useEditHook.draftsPopup && (
        <>
          <DraftsPopup
            useEnrollHook={useEnrollHook}
            off={() => useEditHook.setDraftsPopup(false)}
          />
          <PopupBg bg off={() => useEditHook.setDraftsPopup(false)} />
        </>
      )}

      {useEditHook.delDraftPopup && (
        <>
          <ConfirmPopup
            title="임시저장글을 삭제하시겠습니까?"
            content={`선택한 임시저장글을 삭제하면
다시 불러올 수 없습니다.`}
            cancelFunc={() => useEditHook.setDelDraftPopup(false)}
            confirmFunc={() => useEditHook.setDelDraftPopup(false)}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEditHook.setDelDraftPopup(false)}
          />
        </>
      )}

      {useEditHook.loadDraftPopup && (
        <>
          <ConfirmPopup
            title="선택한 글을 불러오시겠습니까?"
            content={`임시글을 불러오면 작성 중인 글은
사라집니다.`}
            cancelFunc={() => useEditHook.setLoadDraftPopup(false)}
            confirmFunc={() => {
              useEditHook.setDraftsPopup(false);
              useEditHook.setLoadDraftPopup(false);
            }}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEditHook.setLoadDraftPopup(false)}
          />
        </>
      )}

      {useEditHook.confirmSaveEditPopup && (
        <>
          <ConfirmPopup
            title="수정을 완료하시겠습니까?"
            content={`심사 후 재판매 가능 여부를 알람을 통해 알려드리겠습니다. 판매가 개시되면 7일간 글을 수정할 수 없습니다.`}
            cancelFunc={() => useEditHook.setConfirmSaveEditPopup(false)}
            confirmFunc={() => {
              useEditHook.setConfirmSaveEditPopup(false);
              useEditHook.setCompEditPopup(true);
            }}
          />
          <PopupBg bg off={() => useEditHook.setConfirmSaveEditPopup(false)} />
        </>
      )}

      {useEditHook.compEditPopup && (
        <>
          <ErrorMsgPopup
            msg="글 수정이 완료되었습니다."
            confirmFunc={() => {
              useEditHook.setConfirmSaveEditPopup(false);
              router.push("/");
            }}
          />
          <PopupBg
            bg
            off={() => {
              useEditHook.setConfirmSaveEditPopup(false);
              router.push("/");
            }}
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
