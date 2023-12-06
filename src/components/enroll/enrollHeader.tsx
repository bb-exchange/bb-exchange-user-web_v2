import { useRouter } from "next/router";
import styles from "./enrollHeader.module.scss";
import LogoBlue from ".assets/logos/LogoBlue.svg";
// import Undo from ".assets/icons/Undo.svg";
// import Redo from ".assets/icons/Redo.svg";
import useEnroll from ".src/hooks/enroll/useEnroll";
import { useCallback, useState } from "react";
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
  TextIcon,
  ImageIcon,
} from "lucide-react";
import { BsJustify, BsJustifyLeft, BsJustifyRight } from "react-icons/bs";

interface Iprops {
  editor: any;
  useEnrollHook: ReturnType<typeof useEnroll>;
}

export default function EnrollHeader({ editor, useEnrollHook }: Iprops) {
  const router = useRouter();

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

  const upload = (file: File) => {
    // handle upload logic here
  };
  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return;
    console.log("file?", e?.target?.files);

    // upload(e.target.files[0])
    //   .then((res) => addImage(res))
    //   .catch((err) => console.error(err))
  };

  return (
    <header className={styles.enrollHeader}>
      <section className={styles.saveBar}>
        <article className={styles.leftArea}>
          <button className={styles.logoBtn} onClick={() => router.push("/")}>
            <LogoBlue />
          </button>
        </article>

        <article className={styles.rightArea}>
          <div className={styles.tempSaveBox}>
            <button className={styles.tempSaveBtn2} onClick={() => {}}>
              임시 2
            </button>
            <button
              className={styles.tempSaveBtn1}
              onClick={() => useEnrollHook.setDraftsPopup(true)}
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
              게시하기
            </button>
          ) : (
            <button
              type="button"
              className={styles.enrollBtn}
              onClick={useEnrollHook.onClickEnrollBtn}
            >
              게시하기
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
              <ImageIcon
                aria-label="image"
                size={16}
                className={styles.fileButtonImg}
              />
              <input
                type="file"
                name="file"
                accept=".png,.jpg,.jpeg"
                id="upload"
                onChange={handleChangeImg}
                className={styles.fileInput}
              />
              {/* editor.chain().focus().setImage({ src: url }).run() */}
            </button>
          </>
        )}
      </section>
    </header>
  );
}
