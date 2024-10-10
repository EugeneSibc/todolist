import { Dispatch } from "redux"
import { ResponseType } from "api/todolists-api"
import { appActions } from "state/appSlice"

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setError(data.messages[0]))
  } else {
    dispatch(appActions.setError("Some error occurred"))
  }
  dispatch(appActions.setStatus("failed"))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setError(error.message))
  dispatch(appActions.setStatus("failed"))
}
