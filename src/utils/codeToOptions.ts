import { CodeType } from "@const/common";

export function codeToOptions<T extends string>(code: CodeType<T>): { label: string; value: T }[] {
  return Object.keys(code).map((key) => ({
    label: code[key as T].label,
    value: code[key as T].value,
  }));
}
