import { Dispatch } from "redux"
import { ResponseType } from "features/todolists/api/todolists-api"
import { appActions } from "app/appSlice"
import { AppThunkDispatch } from "app/store"
import axios from "axios"

// generic function
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(appActions.setError(data.messages[0]))
  } else {
    dispatch(appActions.setError("Some error occurred"))
  }
  dispatch(appActions.setStatus("failed"))
}

export const handleServerNetworkError = (
  err: unknown,
  dispatch: AppThunkDispatch,
): void => {
  let errorMessage = "Some error occurred"

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setError(errorMessage))
  dispatch(appActions.setStatus("failed"))
}
