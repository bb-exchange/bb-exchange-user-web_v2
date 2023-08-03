import { useEffect, useState } from "react";

export default function UseScrollTopBtn() {
  const [scrollEnd, setScrollEnd] = useState<boolean>(false);

  function onScrollScrollRef(e: any) {
    console.log(
      document.documentElement?.scrollHeight <
        document.documentElement.scrollTop + window.innerHeight + 100
    );

    if (
      document.documentElement?.scrollHeight <
      document.documentElement.scrollTop + window.innerHeight + 100
    ) {
      setScrollEnd(true);
    } else setScrollEnd(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScrollScrollRef);

    return () => {
      window.removeEventListener("scroll", onScrollScrollRef);
    };
  }, []);

  return { scrollEnd };
}
