import { D_postReportCaategoryList } from ".src/data/post/D_postReport";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UsePostReport() {
  const [reportCategory, setReportCategory] = useState<string[]>(
    D_postReportCaategoryList
  );

  const { register, watch, setValue, formState, resetField, handleSubmit } =
    useForm<IpostReport>();

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
