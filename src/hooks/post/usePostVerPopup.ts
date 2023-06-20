import { D_postVerList } from ".src/data/post/D_postVersion";
import { useRef, useState } from "react";

export default function UsePostVerPopup() {
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const [verList, setVerList] = useState<IpostVersions[]>(D_postVerList);
  const [scrollTop, setScrollTop] = useState<string | number>("10%");

  function onScroll(e: any) {
    let { clientHeight, scrollTop, scrollHeight } = e.target;

    const _maxScroll = scrollHeight - clientHeight;
    const _scrollPos =
      (scrollTop * (clientHeight - scrollBarRef.current?.clientHeight!) * 0.9) /
      _maxScroll;

    setScrollTop(_scrollPos + _maxScroll / 10);
  }

  return { scrollBarRef, verList, scrollTop, onScroll };
}
