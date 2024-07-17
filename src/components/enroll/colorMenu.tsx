import styles from "./colorMenu.module.scss";

import React from "react";

import Circle from "@assets/images/tiptap/circle";
import XCircle from "@assets/images/tiptap/xCicle";

import { D_colorList } from "@data/enroll/D_color";

interface Props {
  color: string;
  onClickColor: Function;
}

export default function ColorMenu({ color, onClickColor }: Props) {
  return (
    <div className={styles.colorMenuContainer}>
      {D_colorList.map((color, index) => (
        <button key={index} onClick={() => onClickColor(color)}>
          {index !== 0 ? <Circle fill={color} /> : <XCircle />}
        </button>
      ))}
    </div>
  );
}
