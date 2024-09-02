export type CodeType<T extends string> = Record<T, { label: string; value: T }>;
