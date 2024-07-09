import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { D_userReportCategoryList } from ".src/data/post/D_userReport";

import { usePostUserReport } from "@api/post";

import useGetMyProfile from "@hooks/common/useGetProfile";

import { allowScroll, preventScroll } from "@utils/modal";

export default function UseUserReport(userId: number) {
  const [reportCategory, setReportCategory] = useState<IreportCategory[]>(D_userReportCategoryList);

  const { register, watch, setValue, formState, resetField, handleSubmit } = useForm<IuserReport>();

  const { reportUser } = usePostUserReport();

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
    await reportUser(
      {
        userId,
        reason: form.category,
        content: form.detail,
      },
      {
        onSuccess: () => callback(),
      },
    );
  };

  return {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
    onSubmit,
    reportCategory,
  };
}
