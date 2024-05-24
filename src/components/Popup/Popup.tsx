import styles from "./Popup.module.scss";

import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";

import X from ".assets/icons/X.svg";

type PopupProps = {
  title?: String;
  showClose?: boolean;
  onClose?: () => void;
  visible?: boolean;
  style?: CSSProperties;
};

export default function Popup({
  title,
  showClose,
  onClose,
  visible,
  style,
  children,
}: PropsWithChildren<PopupProps>) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let timeoutId: any;
    if (visible) {
      document.body.style.overflow = "hidden";
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 300);
    }

    return () => {
      document.body.style.overflow = "unset";

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup} style={style}>
        {title && (
          <div className={styles.header}>
            <h2 className="h2 bold color-primary-bg1">{title}</h2>
            {(showClose || onClose) && (
              <button onClick={onClose} className="close">
                <X />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
