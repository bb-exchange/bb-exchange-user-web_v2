import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { D_postReportCategoryList } from ".src/data/post/D_postReport";

import { usePostArticleReport } from "@api/post";

import { allowScroll, preventScroll } from "@utils/modal";

export default function UsePostReport(articleId: number) {
  const [reportCategory, setReportCategory] = useState<IreportCategory[]>(D_postReportCategoryList);

  const { register, watch, getValues, setValue, formState, resetField, handleSubmit } =
    useForm<IpostReport>();

  const { reportArticle } = usePostArticleReport();

  // 백그라운드 스크롤 고정 로직
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  useEffect(() => {
    register("category", {
      required: true,
    });
  }, [register]);

  const onSubmit = async (form: IpostReport, callback: Function) => {
    await reportArticle(
      {
        articleId,
        reason: form.category,
        content: form.detail,
      },
      {
        onSuccess: () => {
          callback();
        },
      },
    );
  };

  return {
    register,
    watch,
    getValues,
    setValue,
    formState,
    handleSubmit,
    onSubmit,
    reportCategory,
  };
}
