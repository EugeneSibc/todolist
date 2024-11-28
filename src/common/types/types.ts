export type ExtraAction<T extends (...arg: any) => any> = Omit<
  ReturnType<T>,
  "meta"
>

export type FieldErrorType = {
  error: string
  field: string
}

//❗ Чтобы у нас не было пересечения имен назовем общий тип BaseResponseType
export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldErrorType[]
}