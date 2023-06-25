import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Iprops {
  inlinePage?: boolean;
}

export default function usePageNav({ inlinePage }: Iprops) {
  const router = useRouter();

  const [page, setPage] = useState<number>(+(router.query.page || 1));

  useEffect(() => {
    if (!inlinePage) setPage(+(router.query.page || 1));
  }, [router]);

  function onClickPageBtn(page: number) {
    if (inlinePage) setPage(page);
    else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page },
      });
  }

  function onClickArrBtn(type: "pre" | "next") {
    let _page: number = page;

    switch (type) {
      case "pre":
        if (_page > 1) _page--;
        break;
      case "next":
        _page++;
    }

    if (inlinePage) setPage(_page);
    else
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page: _page },
      });
  }

  return { page, onClickPageBtn, onClickArrBtn };
}
