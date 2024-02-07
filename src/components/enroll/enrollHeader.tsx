import { useCallback, useEffect, useState } from "react";

import SelectArrow from ".assets/images/tiptap/select-arrow.svg";
import Quote from ".assets/images/tiptap/quote.svg";
import Ol from ".assets/images/tiptap/ol.svg";
import Li from ".assets/images/tiptap/li.svg";
import Align from ".assets/images/tiptap/center.svg";

import Bold from ".assets/images/tiptap/bold.svg";
import BoldActive from ".assets/images/tiptap/bold-active.svg";
import Italic from ".assets/images/tiptap/italic.svg";
import ItalicActive from ".assets/images/tiptap/italic-active.svg";
import Underline from ".assets/images/tiptap/underline.svg";
import UnderlineActive from ".assets/images/tiptap/underline-active.svg";
import Color from ".assets/images/tiptap/color.svg";

import Link from ".assets/images/tiptap/link.svg";
import Photo from ".assets/images/tiptap/photo.svg";

import Undo from ".assets/images/tiptap/undo.svg";
import Redo from ".assets/images/tiptap/redo.svg";

import LogoBlue from ".assets/logos/LogoBlue.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";
import styles from "./enrollHeader.module.scss";

import HeadingCategoryPopup from "./headingCategoryPopup";
// import AlignCategoryPopup from "./alignCategoryPopup";
import PopupBg from "../common/popupBg";

interface Iprops {
  editor: any;
  isEdit: boolean;
  useEnrollHook: ReturnType<typeof useEnroll>;
}

export default function EnrollHeader({
  editor,
  isEdit,
  useEnrollHook,
}: Iprops) {
  const [isLink, setIsLink] = useState<boolean>(true);
  const [isHeadingSelector, setIsHeadingSelector] = useState<boolean>(false);
  const [headingValue, setHeadingValue] = useState<string>("본문 1");
  const [isAlignSelector, setIsAlignSelector] = useState<boolean>(false);
  const [alignValue, setAlignValue] = useState<string>("left");

  const onToggleHeading = () => {
    setIsHeadingSelector(!isHeadingSelector);
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setIsLink(false);
  }, [editor]);

  const unsetLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setIsLink(true);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    if (headingValue === "제목 1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (headingValue === "제목 2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (headingValue === "제목 3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else if (headingValue === "본문 1") {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    } else if (headingValue === "본문 2") {
      editor.chain().focus().toggleHeading({ level: 5 }).run();
    } else if (headingValue === "본문 3") {
      editor.chain().focus().toggleHeading({ level: 6 }).run();
    }
  }, [editor, headingValue]);

  const onToggleAlignMenu = () => {
    setAlignValue((prev) =>
      prev === "left" ? "center" : prev === "center" ? "right" : "left"
    );
    // setIsAlignSelector(!isAlignSelector);
  };
  useEffect(() => {
    if (!editor) return;

    if (alignValue === "left") {
      editor.chain().focus().setTextAlign("left").run();
    } else if (alignValue === "center") {
      editor.chain().focus().setTextAlign("center").run();
    } else if (alignValue === "right") {
      editor.chain().focus().setTextAlign("right").run();
    }
  }, [editor, alignValue]);

  return (
    <header className={styles.enrollHeader}>
      <section className={styles.saveBar}>
        <article className={styles.leftArea}>
          <button
            className={styles.logoBtn}
            onClick={() => useEnrollHook.setWriteCancelPopup(true)}
          >
            <LogoBlue />
            <span className={styles.logoBeta}>Beta</span>
          </button>
        </article>
        <article className={styles.rightArea}>
          {useEnrollHook.btnName === "게시하기" ? (
            <div className={styles.tempSaveBox}>
              <button
                className={styles.tempSaveBtn2}
                onClick={useEnrollHook.openDraftsPopup}
              >
                임시 {useEnrollHook.articleTempList?.data.length ?? 0}
              </button>
              <button
                className={styles.tempSaveBtn1}
                onClick={useEnrollHook.onClickEnrollTemp}
              >
                임시저장
              </button>
            </div>
          ) : null}
          {useEnrollHook.isDisabledBtn ? (
            <button
              type="button"
              className={styles.disabled}
              onClick={useEnrollHook.onClickEnrollBtn}
            >
              {useEnrollHook.btnName}
            </button>
          ) : (
            <button
              type="button"
              className={styles.enrollBtn}
              onClick={useEnrollHook.onClickEnrollBtn}
            >
              {useEnrollHook.btnName}
            </button>
          )}
        </article>
      </section>
      <section className={`${styles.toolBar} ${styles.toolBar2}`}>
        {editor && (
          <div className={styles.toolbarRow}>
            <div id="heading" className={styles.toolbarLeft}>
              <div className={styles.selectHeading} onClick={onToggleHeading}>
                <span id="heading-value" className={styles.selectValue}>
                  {headingValue}
                </span>
                <SelectArrow />
              </div>

              {isHeadingSelector && (
                <>
                  <HeadingCategoryPopup
                    categoryList={[
                      "제목 1",
                      "제목 2",
                      "제목 3",
                      "본문 1",
                      "본문 2",
                      "본문 3",
                    ]}
                    setValue={(v: any) => setHeadingValue(v)}
                    off={() => setIsHeadingSelector(false)}
                  />
                  <PopupBg off={() => setIsHeadingSelector(false)} />
                </>
              )}

              <button
                id="quote"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "is-active" : ""}
              >
                <Quote />
              </button>
              <button
                id="ol"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <Ol />
              </button>
              <button
                id="li"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <Li />
              </button>
              <button onClick={onToggleAlignMenu} className={styles.alignBtn}>
                <Align />
              </button>
              {/* NOTE 아이콘이 없어서 클릭 동작으로 변경함 */}
              {/* {isAlignSelector && (
                <>
                  <AlignCategoryPopup
                    categoryList={["left", "center", "right"]}
                    setValue={(v: any) => setAlignValue(v)}
                    off={() => setIsAlignSelector(false)}
                  />
                  <PopupBg off={() => setIsAlignSelector(false)} />
                </>
              )} */}
              <button
                id="bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold />
              </button>
              <button
                id="italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic />
              </button>
              <button
                className={styles.colorBtn}
                id="underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <Underline />
              </button>
              {/* <button id="color" className={styles.colorBtn}>
                <Color />
              </button> */}

              <button onClick={isLink ? setLink : unsetLink}>
                <Link />
              </button>
              <button id="photo" className={styles.fileButtonArea}>
                <input
                  type="file"
                  name="file"
                  accept=".png,.jpg,.jpeg"
                  id="upload"
                  multiple={true}
                  onChange={useEnrollHook.handleChangeImg}
                  className={styles.fileInput}
                />
                <Photo />
              </button>
            </div>

            <div>
              <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </button>
            </div>
          </div>
        )}
      </section>
    </header>
  );
}
