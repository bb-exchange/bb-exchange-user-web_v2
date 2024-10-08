type CodeType<T extends string> = Record<T, { label: string; value: T }>;

export function codeToArray<T extends string>(code: CodeType<T>): { label: string; value: T }[] {
  return Object.keys(code).map((key) => ({
    label: code[key as T].label,
    value: code[key as T].value,
  }));
}
