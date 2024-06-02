// TODO: telecom api 바뀌면 삭제
export type CodeType<T extends string> = Record<T, { label: string; value: T }>;

export type TelecomType = "SKT" | "KT" | "LG" | "SKT_SAVE" | "KT_SAVE" | "LG_SAVE";
export const TelecomCode: CodeType<TelecomType> = {
  SKT: {
    label: "SKT",
    value: "SKT",
  },
  KT: {
    label: "KT",
    value: "KT",
  },
  LG: {
    label: "LG",
    value: "LG",
  },
  SKT_SAVE: {
    label: "SKT 알뜰폰",
    value: "SKT_SAVE",
  },
  KT_SAVE: {
    label: "KT 알뜰폰",
    value: "KT_SAVE",
  },
  LG_SAVE: {
    label: "LG 알뜰폰",
    value: "LG_SAVE",
  },
};
