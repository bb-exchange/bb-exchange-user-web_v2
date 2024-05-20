import { useRef, useState } from "react";

export default function UseScrollBar() {
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState<string | number>(0);

  function onScroll(e: any) {
    let { clientHeight, scrollTop, scrollHeight } = e.target;

    const _maxScroll = scrollHeight - clientHeight;
    const _scrollPos =
      (scrollTop * (clientHeight - scrollBarRef.current?.clientHeight!)) / _maxScroll;

    setScrollTop(_scrollPos);
  }

  return { scrollBarRef, scrollTop, onScroll };
}
