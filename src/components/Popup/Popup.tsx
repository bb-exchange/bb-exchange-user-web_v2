import styles from "./Popup.module.scss";
import { PropsWithChildren, useEffect, useState } from "react";

type PopupProps = {
  title?: String;
  showClose?: boolean;
  onClose?: () => void;
  visible?: boolean;
};

export default function Popup({
  title,
  showClose,
  onClose,
  visible,
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
      <div className={styles.popup}>
        title
        {children}
      </div>
    </div>
  );
}
