import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enrollScreen.module.scss";
import "react-quill/dist/quill.snow.css";

import { EditorContent } from "@tiptap/react";

import useEnroll from ".src/hooks/enroll/useEnroll";

import EnrollGuid from ".assets/icons/EnrollGuid.svg";
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
import UseRecentTagPopup from ".src/hooks/enroll/useRecentTagPopup";
import { fetchCategory } from ".src/api/articles/category";
import { useMakeEditor } from ".src/hooks/enroll/useMakeEditor";
import LoadingPopup from ".src/components/common/popup/loadingPopup";

export default function EnrollScreen() {
  const router = useRouter();

  const { editor } = useMakeEditor({ isEdit: true });
  const useEnrollHook = useEnroll(editor ?? null);
  const tagHook = UseRecentTagPopup({ useEnrollHook });

  const [guideTooltip, setGuideTooltip] = useState(false);

  //NOTE - 카테고리 목록 호출
  const { data: categoryList } = useQuery({
    queryKey: ["articleCategory"],
    queryFn: fetchCategory,
  });

  //NOTE - 임시 저장된 글 불러왔을 때
  useEffect(() => {
    const article = useEnrollHook.tempArticle;
    if (article) {
      const category = categoryList?.filter(
        (item) => item.category === article.data.category
      )[0];
      useEnrollHook.setValue("title", article.data.title);
      category && useEnrollHook.setValue("category", category);

      const json = JSON.parse(article.data.content);
      editor?.commands.setContent(json);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEnrollHook.tempArticle]);

  return (
    <>
      <EnrollHeader
        isEdit={false}
        editor={editor}
        useEnrollHook={useEnrollHook}
      />

      <section className={styles.innerSec}>
        <article
          className={`${styles.contArea} ${
            useEnrollHook.mobileView ? styles.mobile : ""
          }`}
        >
          <form id="enrollForm">
            <div className={styles.topBar}>
              <div className={styles.categoryBox}>
                <button
                  type="button"
                  className={styles.selBtn}
                  onClick={() => useEnrollHook.setSelCategoryPopup(true)}
                >
                  {useEnrollHook.watch("category") ? (
                    <p className={styles.categoryText}>
                      {useEnrollHook.watch("category")?.description}
                    </p>
                  ) : (
                    <input
                      {...useEnrollHook.register("category", {
                        required: "카테고리를 선택해주세요",
                      })}
                      placeholder="카테고리를 선택해주세요"
                    />
                  )}

                  <ChevronDn />
                </button>

                {useEnrollHook.selCategoryPopup && (
                  <>
                    <SelCategoryPopup
                      categoryList={categoryList ?? []}
                      setValue={(v: IpostCategories) =>
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
                    maxLength: {
                      value: 40,
                      message: "제목은 최대 40자까지 입력 가능합니다.",
                    },
                  })}
                  placeholder="제목을 입력해주세요. (최대 40자)"
                />
              </div>
            </div>

            <div
              className={styles.editorBox}
              onClick={(e) => useEnrollHook.onClickEditor(e)}
            >
              {editor && <EditorContent editor={editor} height={"100%"} />}
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
                  value={tagHook.tagKeyword ?? ""}
                  onKeyUp={tagHook.handleKeywordKeyDown}
                  placeholder="# 멘션할 태그를 입력해주세요(최대 10개)"
                  onChange={(e) => tagHook.onChangeTag(e.target.value)}
                />
                {/* #한글자 입력시 */}
                {tagHook.tagKeyword && <RecentTagPopup tagHook={tagHook} />}
              </span>
            </div>
          </form>
        </article>

        <button
          onMouseOver={() => setGuideTooltip(true)}
          onMouseLeave={() => setGuideTooltip(false)}
          className={`${styles.phoneScreenBtn} ${styles.enrollGuideBtn}`}
          onClick={() => router.push("/serviceIntroduction")}
        >
          <p>작성 가이드</p>

          <span className={styles.imgBox}>
            <EnrollGuid />
          </span>
        </button>

        {guideTooltip && (
          <div className={styles.guideTooltip}>
            <p>어떤 글을 작성해야할 지 모르겠다면?</p>
            <span className={styles.tooltipArrow} />
          </div>
        )}

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
            confirmFunc={() => useEnrollHook.onDeleteTemp()}
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
            confirmFunc={() => useEnrollHook.onLoadTempArticle()}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEnrollHook.setLoadDraftPopup(false)}
          />
        </>
      )}
      {useEnrollHook.writeCancelPopup && (
        <>
          <ConfirmPopup
            title="글쓰기를 취소하시겠습니까?"
            content={`임시저장하면 나중에 이어서
작성할 수 있습니다.`}
            cancelText="글쓰기 취소"
            cancelFunc={() => {
              useEnrollHook.setWriteCancelPopup(false);
              router.push("/");
            }}
            confirmText="임시저장"
            confirmFunc={() => useEnrollHook.onClickEnrollTemp()}
            zIndex={80}
          />
          <PopupBg
            bg
            zIndex={70}
            off={() => useEnrollHook.setWriteCancelPopup(false)}
          />
        </>
      )}
      {useEnrollHook.tempSuccessPostPopup && (
        <>
          <ErrorMsgPopup
            msg={
              <>
                <span>임시저장되었습니다.</span>
                <span>(이미지는 임시저장이 불가합니다.)</span>
              </>
            }
            confirmFunc={() => useEnrollHook.setTempSuccessPostPopup(false)}
          />
          <PopupBg
            bg
            off={() => useEnrollHook.setTempSuccessPostPopup(false)}
          />
        </>
      )}
      {useEnrollHook.successTempUpdatePopup && (
        <>
          <ErrorMsgPopup
            msg="글 수정이 완료되었습니다."
            confirmFunc={() => {
              useEnrollHook.setSuccessTempUpdatePopup(false);
              router.push("/mypage");
            }}
          />
          <PopupBg
            bg
            off={() => useEnrollHook.setSuccessTempUpdatePopup(false)}
          />
        </>
      )}
      {useEnrollHook.successPostPopup && (
        <>
          <LoadingPopup message="게시글 업로드 중입니다." />
          <PopupBg
            bg
            off={() => useEnrollHook.setTempSuccessPostPopup(false)}
          />
        </>
      )}
    </>
  );
}
