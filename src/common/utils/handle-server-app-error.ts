import { Dispatch } from "redux"
import { ResponseType } from "features/todolists/api/todolists-api"
import { appActions } from "app/appSlice"

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */

export const handleServerAppError = <T>(
    data: ResponseType<T>,
    dispatch: Dispatch,
    showError: boolean = true
  ) => {
    if(showError){
      if (data.messages.length) {
        dispatch(appActions.setError(data.messages[0]))
      } else {
        dispatch(appActions.setError("Some error occurred"))
      }    
    }
    dispatch(appActions.setStatus("failed"))  
  }