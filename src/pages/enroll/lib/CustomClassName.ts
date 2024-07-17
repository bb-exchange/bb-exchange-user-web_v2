import { Extension } from "@tiptap/core";
import "@tiptap/extension-text-style";
import classNames from "classnames";

type FontSizeOptions = {
  types: string[];
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    className: {
      setClassName: (className: string) => ReturnType;
    };
  }
}

export const CustomClassName = Extension.create<FontSizeOptions>({
  name: "className",

  addOptions(): FontSizeOptions {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          className: {
            default: null,
            parseHTML: (element) => {
              return element.className.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              const className = attributes.className;
              if (!className) {
                return {};
              }

              return {
                class: className,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setClassName:
        (className) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { className }).run();
        },
    };
  },
});
