import { useRouter } from "next/router";
import { useState } from "react";

export default function usePageNav() {
  const router = useRouter();

  const page: number = +(router.query.page || 1);

  console.log(page);

  function onClickPageBtn(page: number) {
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

    router.replace({
      pathname: router.pathname,
      query: { ...router.query, page: _page },
    });
  }

  return { page, onClickPageBtn, onClickArrBtn };
}
