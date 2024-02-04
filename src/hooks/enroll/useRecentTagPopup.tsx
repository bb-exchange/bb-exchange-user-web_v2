import { fetchTagList } from ".src/api/articles/tags";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import useEnroll from "./useEnroll";

interface Iprops {
  useEnrollHook?: ReturnType<typeof useEnroll>;
}

export default function UseRecentTagPopup({ useEnrollHook }: Iprops) {
  const [tagKeyword, setTagKeyword] = useState<string | null>(null);

  const { data: tagList } = useQuery({
    queryKey: ["tagList", tagKeyword],
    queryFn: fetchTagList,
    enabled: !!tagKeyword,
    select: (res) => res.data.data ?? [],
  });

  const onChangeTag = (value: string) => {
    setTagKeyword(value);
  };

  const handleKeywordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Space") {
        tagKeyword && useEnrollHook?.setNewTag(tagKeyword);
        setTagKeyword(null);
      }
      // backspace 클릭 시 태그 삭제
      if (e.code === "Backspace") {
        setTagKeyword(null);
      }
    },
    [tagKeyword, useEnrollHook]
  );

  function handleClickCategory(v: string) {
    if (useEnrollHook) {
      useEnrollHook.setNewTag(v);
    }

    setTagKeyword("");
  }

  return {
    tagKeyword,
    setTagKeyword,
    tagList,
    handleKeywordKeyDown,
    handleClickCategory,
    onChangeTag,
  };
}
