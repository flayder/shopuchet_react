import { AxiosError } from "axios"
import { AppDispatch, RootState } from "./store"

export type ThunkState = {
  loading: boolean
  error?: AxiosError
}

export type ThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: AxiosError
}
