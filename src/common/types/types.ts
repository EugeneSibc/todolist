export type ExtraAction<T extends (...arg: any) => any> = Omit<
  ReturnType<T>,
  "meta"
>
