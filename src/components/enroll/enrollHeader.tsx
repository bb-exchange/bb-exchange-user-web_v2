// import AlignCategoryPopup from "./alignCategoryPopup";
import PopupBg from "../common/popupBg";
import ColorMenu from "./colorMenu";
import HeadingCategoryPopup from "./headingCategoryPopup";

import styles from "./enrollHeader.module.scss";

import { useCallback, useEffect, useState } from "react";

import BoldActive from ".assets/images/tiptap/bold-active.svg";
import Align from ".assets/images/tiptap/center.svg";
import ItalicActive from ".assets/images/tiptap/italic-active.svg";
import Italic from ".assets/images/tiptap/italic.svg";
import Li from ".assets/images/tiptap/li.svg";
import Link from ".assets/images/tiptap/link.svg";
import Ol from ".assets/images/tiptap/ol.svg";
import Photo from ".assets/images/tiptap/photo.svg";
import Quote from ".assets/images/tiptap/quote.svg";
import Redo from ".assets/images/tiptap/redo.svg";
import SelectArrow from ".assets/images/tiptap/select-arrow.svg";
import UnderlineActive from ".assets/images/tiptap/underline-active.svg";
import Underline from ".assets/images/tiptap/underline.svg";
import Undo from ".assets/images/tiptap/undo.svg";
import LogoBlue from ".assets/logos/LogoBlue.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";
import { useEditor } from "@tiptap/react";
import { useRecoilState, useSetRecoilState } from "recoil";

import Bold from "@assets/images/tiptap/bold";
import Color from "@assets/images/tiptap/color";

import { D_headingList, Heading } from "@data/enroll/D_heading";

import { headingAtom } from "@recoil/enroll";

interface Iprops {
  editor: ReturnType<typeof useEditor>;
  isEdit: boolean;
  useEnrollHook: ReturnType<typeof useEnroll>;
}

interface EDITOR_FONT_CLASS_TYPE {
  [index: string]: string;
}

export const EDITOR_FONT_CLASS: EDITOR_FONT_CLASS_TYPE = {
  TITLE_1: "title_1",
  TITLE_2: "title_2",
  TITLE_3: "title_3",
  MAIN_1: "main_1",
  MAIN_2: "main_2",
  MAIN_3: "main_3",
};

export default function EnrollHeader({ editor, isEdit, useEnrollHook }: Iprops) {
  const [isLink, setIsLink] = useState<boolean>(true);
  const [isHeadingSelector, setIsHeadingSelector] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");

  const [isAlignSelector, setIsAlignSelector] = useState<boolean>(false);
  const [alignValue, setAlignValue] = useState<string>("left");
  const [headingInfo, setHeadingInfo] = useRecoilState(headingAtom);

  const onToggleHeading = () => {
    setIsHeadingSelector(!isHeadingSelector);
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setIsLink(false);
  }, [editor]);

  const unsetLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
    setIsLink(true);
  }, [editor]);

  useEffect(() => {
    const className = EDITOR_FONT_CLASS[headingInfo.key];
    if (!editor || !className) return;
    editor.chain().focus().setClassName(className).run();
  }, [editor, headingInfo]);

  const onToggleAlignMenu = () => {
    setAlignValue((prev) => (prev === "left" ? "center" : prev === "center" ? "right" : "left"));
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

  useEffect(() => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
  }, [color, editor]);

  if (!editor) {
    return null;
  }

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
          <div className={styles.tempSaveBox}>
            <button className={styles.tempSaveBtn2} onClick={useEnrollHook.openDraftsPopup}>
              임시 {useEnrollHook.articleTempList?.data.length ?? 0}
            </button>
            <button className={styles.tempSaveBtn1} onClick={useEnrollHook.onClickEnrollTemp}>
              임시저장
            </button>
          </div>
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
                  {headingInfo.value}
                </span>
                <SelectArrow />
              </div>

              {isHeadingSelector && (
                <>
                  <HeadingCategoryPopup
                    categoryList={D_headingList}
                    setValue={(heading: Heading) => setHeadingInfo(heading)}
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
              <button id="ol" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <Ol />
              </button>
              <button id="li" onClick={() => editor.chain().focus().toggleBulletList().run()}>
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
              <button id="bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                {editor.isActive("bold") ? <BoldActive /> : <Bold />}
              </button>
              <button id="italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                {editor.isActive("italic") ? <ItalicActive /> : <Italic />}
              </button>
              <button id="underline" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                {editor.isActive("underline") ? <UnderlineActive /> : <Underline />}
              </button>
              <div className={styles.colorBtn}>
                <button id="color">
                  <Color color={editor.getAttributes("textStyle").color || "#000000"} />
                </button>
                <ColorMenu color={color} onClickColor={(_color: string) => setColor(_color)} />
              </div>

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
