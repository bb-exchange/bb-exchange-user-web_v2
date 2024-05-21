import useEnroll from ".src/hooks/enroll/useEnroll";
import { selectedEditorNodeState } from ".src/recoil";
import { findChildren, mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
  // findChildren,
  // mergeAttributes,
  // nodeInputRule,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSetRecoilState } from "recoil";

const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      setImage: (options: any) => ReturnType;
      setThumb: (nodePos: any) => ReturnType;
      deleteImage: (nodePos: number) => ReturnType;
    };
  }
}

interface IProps {
  isEdit: boolean;
}
export const useMakeEditor = ({ isEdit }: IProps) => {
  const setEditorNodePos = useSetRecoilState(selectedEditorNodeState);

  const Figure = Node.create({
    name: "figure",

    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    group: "block",

    content: "inline*",

    defining: true,

    addAttributes() {
      return {
        src: {
          default: null,
          parseHTML: (element) => {
            element.querySelector("img")?.getAttribute("src");
          },
        },

        isThumb: {
          default: null,
          parseHTML: (element) =>
            element.querySelector("figure")?.getAttribute("data-is-thumb") ?? false,
        },

        fileName: {
          default: null,
          parseHTML: (element) => {
            element.querySelector("img")?.getAttribute("fileName");
          },
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "figure",
          contentElement: "figcaption",
        },
      ];
    },

    renderHTML({ node, HTMLAttributes }) {
      return [
        "figure",
        mergeAttributes(HTMLAttributes, {
          isThumb: node.attrs.isThumb ? true : false,
        }),
        [
          "img",
          mergeAttributes(HTMLAttributes, {
            draggable: false,
            contenteditable: false,
          }),
        ],
        [
          "div",
          mergeAttributes({
            class: "thumb-box",
          }),
        ],
        ["figcaption", ["figcaption", 0]],
      ];
    },

    addCommands() {
      return {
        setImage:
          (options) =>
          ({ chain }) => {
            return chain()
              .insertContent([
                {
                  type: this.name,
                  attrs: options,
                  content: [],
                },
                { type: "paragraph", content: [] },
              ])
              .focus()
              .run();
          },
        setThumb:
          (nodePos: any) =>
          ({ tr, commands }: { tr: any; commands: any }) => {
            const { doc } = tr;
            const images = findChildren(doc, (node) => node.type === this.type);

            if (!images.length) {
              return false;
            }
            return commands.forEach(images, ({ node, pos }: { node: any; pos: any }) => {
              tr.setNodeMarkup(pos, undefined, {
                ...node?.attrs,
                isThumb: nodePos === pos,
              });
              return true;
            });
          },
        deleteImage:
          (nodePos: number) =>
          ({ tr, commands }: { tr: any; commands: any }) => {
            const { doc } = tr;
            const images = findChildren(doc, (node) => node.type === this.type);
            const target = images.filter(({ pos }) => pos == nodePos)[0];
            const size = target.node.nodeSize;
            return commands.deleteRange({ from: nodePos, to: nodePos + size });
          },
      };
    },

    addInputRules() {
      return [
        nodeInputRule({
          find: inputRegex,
          type: this.type,
          getAttributes: (match) => {
            const [, src, alt, title] = match;

            return { src, alt, title };
          },
        }),
      ];
    },

    addNodeView() {
      return ({ node, HTMLAttributes, getPos, editor }) => {
        const container = document.createElement("figure");
        const img = document.createElement("img");
        const thumbBox = document.createElement("div");
        const figcaption = document.createElement("figcaption");
        thumbBox.classList.add("thumb-box");
        thumbBox.innerHTML = "대표";

        img.addEventListener("click", (e) => {
          if (typeof getPos === "function") {
            const pos = getPos();
            setEditorNodePos(pos);
          }
        });

        Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
          container.setAttribute(key, value as string);
        });

        if (node.attrs.isThumb) {
          container.setAttribute("data-isThumb", "");
        }

        Object.entries(HTMLAttributes).forEach(([key, value]) => {
          img.setAttribute(key, value);
        });

        Object.entries(HTMLAttributes).forEach(([key, value]) => {
          if (key === "title" || key === "alt") figcaption.setAttribute(key, value);
        });

        container.append(img, figcaption, thumbBox);

        return {
          dom: container,
          contentDOM: figcaption,
        };
      };
    },
  });

  const editor = useEditor({
    editable: isEdit,
    extensions: [
      CodeBlock,
      Blockquote.configure({
        HTMLAttributes: {
          class: "t-blockquote",
        },
      }),
      BulletList,
      ListItem,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Paragraph,
      // History,
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      Document,
      Link.configure({
        openOnClick: true,
      }),
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Figure,
      Placeholder.configure({
        placeholder: "나누고 싶은 나만의 비법을 적어주세요. (100자 이상)",
      }),
      StarterKit,
    ],
  });

  return { editor };
};
