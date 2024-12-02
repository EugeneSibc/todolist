import { appActions } from "app/appSlice"
import { handleServerNetworkError } from "./handle-server-network-error"
import { AppDispatch, RootState } from "app/store"
import { BaseResponseType } from "common/types/types"
// import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
// GetThunkAPI
// @ts-ignore
import { BaseThunkAPI } from "@reduxjs/toolkit"
//BaseThunkAPI<RootState, unknown, AppDispatch, null | BaseResponseType>

type ThunkAPI = {
  dispatch: AppDispatch
  rejectWithValue: (value:null | BaseResponseType) => any
}

export const thunkTryCatch = async (
  thunkAPI: ThunkAPI,
  logic: () => Promise<any>,
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setStatus("loading"))
    return await logic()
  } catch (err) {
    handleServerNetworkError(err, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setStatus("idle"))
  }
}
