import { fetchTagList } from ".src/api/articles/tags";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useEnroll from "./useEnroll";

interface Iprops {
  useEnrollHook?: ReturnType<typeof useEnroll>;
}

export default function UseRecentTagPopup({ useEnrollHook }: Iprops) {
  const [tagKeyword, setTagKeyword] = useState<string>("");
  // const [tagList, setTagList] = useState<string[]>([]);

  // useQuery(["tagList", tagKeyword], fetchTagList, {
  //   retry: false,
  //   onSuccess: (res) => {
  //     console.log(res?.data?.data);
  //     setTagList(res?.data?.data);
  //   },
  // });

  const { data: tagList } = useQuery({
    queryKey: ["tagList", tagKeyword],
    queryFn: fetchTagList,
    select: (res) => res.data.data ?? [],
  });

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    tagKeyword;
    if (!tagKeyword) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (useEnrollHook) {
        useEnrollHook.setNewTag(tagKeyword);
      }

      setTagKeyword("");
    }
  };

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
  };
}
