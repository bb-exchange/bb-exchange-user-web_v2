import { useRouter } from "next/router";

import EnrollHeader from ".src/components/enroll/enrollHeader";
import styles from "./enrollScreen.module.scss";
import "react-quill/dist/quill.snow.css";

import { useEditor, EditorContent, getText } from "@tiptap/react";
// import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
// import { Color } from '@tiptap/extension-color'
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import History from "@tiptap/extension-history";

// import TextStyle from "@tiptap/extension-text-style";
// import Document from "@tiptap/extension-document";
// import Text from "@tiptap/extension-text";

import useEnroll from ".src/hooks/enroll/useEnroll";
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

export default function EnrollScreen() {
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      // History,
      StarterKit,
      // Document,
      Paragraph,
      // Text,
      Bold.configure({
        HTMLAttributes: {
          class: "t-bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "t-italic",
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "t-underline",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "t-blockquote",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      OrderedList,
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
      }),
      Placeholder.configure({
        placeholder: "나누고 싶은 나만의 비법을 적어주세요. (100자 이상)",
      }),
      Image.configure({
        inline: true,
      }),
    ],
  });

  const useEnrollHook = useEnroll(editor ?? null);
  const tagHook = UseRecentTagPopup({ useEnrollHook });

  console.log("getjson", editor?.getJSON());

  return (
    <>
      <EnrollHeader editor={editor} useEnrollHook={useEnrollHook} />

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
              className={styles.quillBox}
              onClick={() => editor?.commands.focus()}
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
                  // onKeyDown={tagHook.handleKeywordKeyDown}
                  onKeyUp={tagHook.handleKeywordKeyDown}
                  placeholder="# 멘션할 태그를 입력해주세요(최대 10개)"
                  onChange={(e) => tagHook.onChangeTag(e.target.value)}
                />

                {tagHook.tagKeyword && <RecentTagPopup tagHook={tagHook} />}
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
      {/* {useEnrollHook.selectImg && (
        <>
          <SelImgPopup useEnrollHook={useEnrollHook} />
          <PopupBg bg off={() => useEnrollHook.setSelectImg(undefined)} />
        </>
      )} */}
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
      {useEnrollHook.writeCancelPopup && (
        <>
          <ConfirmPopup
            title="글쓰기를 취소하시겠습니까?"
            content={`임시저장하면 나중에 이어서
작성할 수 있습니다.`}
            cancelText="글쓰기 취소"
            cancelFunc={() => {
              // 뒤로가기?
              useEnrollHook.setWriteCancelPopup(false);
              router.back();
            }}
            confirmText="임시저장"
            confirmFunc={() => {
              // 임시저장
            }}
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
            msg="임시저장되었습니다."
            confirmFunc={() => useEnrollHook.setTempSuccessPostPopup(false)}
          />
          <PopupBg
            bg
            off={() => useEnrollHook.setTempSuccessPostPopup(false)}
          />
        </>
      )}
    </>
  );
}
