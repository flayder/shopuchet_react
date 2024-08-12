import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ThunkConfig, ThunkState } from "~redux/types"

import api from "~api/."
import { LoginArgs, RegArgs, ResetPassArgs, Tokens } from "~api/routes/auth"

import { getUserAction } from "./userSlice"

export interface AuthState extends ThunkState {}

const initialState: AuthState = {
  loading: false
}

export const loginAction = createAsyncThunk<Tokens, LoginArgs, ThunkConfig>(
  "auth/login",
  async (args, { rejectWithValue, dispatch }) => {
    return await api.auth
      .login(args)
      .then(res => {
        const tokens = res.data
        localStorage.setItem("accessToken", tokens["X-Auth-Token"])
        localStorage.setItem("refreshToken", tokens["Refresh-Token"])
        dispatch(getUserAction())
        return tokens
      })
      .catch(rejectWithValue)
  }
)

export const regAction = createAsyncThunk<string, RegArgs, ThunkConfig>(
  "auth/reg",
  async (args, { rejectWithValue, dispatch }) => {
    return await api.auth
      .reg(args)
      .then(res => {
        dispatch(loginAction({ username: args.login, password: args.password }))
        return res.data
      })
      .catch(rejectWithValue)
  }
)

export const resetPassAction = createAsyncThunk<string, ResetPassArgs, ThunkConfig>(
  "auth/resetPass",
  async (args, { rejectWithValue }) => {
    return await api.auth
      .resetPass(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    },
    logoutAction: () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  },
  extraReducers: builder => {
    //login
    builder.addCase(loginAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(loginAction.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //reg
    builder.addCase(regAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(regAction.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(regAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //resetPass
    builder.addCase(resetPassAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(resetPassAction.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(resetPassAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction, logoutAction } = authSlice.actions
export default authSlice.reducer
