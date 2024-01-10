import { useEditor } from "@tiptap/react";
import { Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Dropcursor from "@tiptap/extension-dropcursor";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";

interface IProps {
  isEdit: boolean;
}
export const useMakeEditor = ({ isEdit }: IProps) => {
  const editor = useEditor({
    editable: isEdit,
    extensions: [
      //FIXME - 이미지 이동 기능 오류
      Node.create({
        group: "block",
        atom: true,
        selectable: true,
        draggable: true,
      }),
      // History,
      StarterKit,
      Document,
      Paragraph,
      Text,
      Dropcursor,
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
        // allowBase64: true,
        HTMLAttributes: {
          id: "t-image",
          class: "t-image",
        },
      }),
    ],
    // editorProps: {
    //   handleDrop: (view, event, slice, moved) => {
    //     if (
    //       !moved &&
    //       event.dataTransfer &&
    //       event.dataTransfer.files &&
    //       event.dataTransfer.files[0]
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
  });

  return { editor };
};
