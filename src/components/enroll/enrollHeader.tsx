import { useCallback, useState } from "react";
import { BsJustify, BsJustifyLeft, BsJustifyRight } from "react-icons/bs";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  QuoteIcon,
  ListIcon,
  ListOrderedIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Undo2Icon,
  Redo2Icon,
  Link,
  ImageIcon,
} from "lucide-react";

import LogoBlue from ".assets/logos/LogoBlue.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";
import styles from "./enrollHeader.module.scss";

interface Iprops {
  editor: any;
  useEnrollHook: ReturnType<typeof useEnroll>;
}

export default function EnrollHeader({ editor, useEnrollHook }: Iprops) {
  const [isLink, setIsLink] = useState<boolean>(true);

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
          <>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1Icon size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2Icon size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3Icon size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
            >
              본문
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              <BoldIcon size={18} />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              <ItalicIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              <QuoteIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrderedIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ListIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <BsJustifyLeft size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <BsJustify size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <BsJustifyRight size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo2Icon size={20} />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo2Icon size={20} />
            </button>
            <button onClick={isLink ? setLink : unsetLink}>
              <Link size={16} />
            </button>
            <button className={styles.fileButtonArea}>
              <input
                type="file"
                name="file"
                accept=".png,.jpg,.jpeg"
                id="upload"
                multiple={true}
                onChange={useEnrollHook.handleChangeImg}
                className={styles.fileInput}
              />
              <ImageIcon
                aria-label="image"
                size={16}
                className={styles.fileButtonImg}
              />
            </button>
          </>
        )}
      </section>
    </header>
  );
}
