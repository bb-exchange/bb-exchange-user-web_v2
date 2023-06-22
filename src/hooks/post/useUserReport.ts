import { D_userReportCategoryList } from ".src/data/post/D_userReport";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UseUserReport() {
  const [reportCategory, setReportCategory] = useState<string[]>(
    D_userReportCategoryList
  );

  const { register, watch, setValue, formState, resetField, handleSubmit } =
    useForm<IuserReport>();

  useEffect(() => {
    register("category", {
      required: true,
    });
  }, []);

  function onSubmit() {}

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
