import { D_reportCaategoryList } from ".src/data/post/D_postReport";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UsePostReport() {
  const [reportCategory, setReportCategory] = useState<string[]>(
    D_reportCaategoryList
  );

  const { register, watch, setValue, formState, resetField, handleSubmit } =
    useForm<IpostReport>();

  return { register, watch, setValue, reportCategory };
}
