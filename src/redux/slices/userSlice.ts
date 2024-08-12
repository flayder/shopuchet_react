import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ThunkConfig, ThunkState } from "~redux/types"

import api from "~api/."
import { EditUserArgs, User } from "~api/routes/user"

export interface UserState extends ThunkState {
  user: User | null
}

const initialState: UserState = {
  user: null,
  loading: false
}

export const getUserAction = createAsyncThunk<User, void, ThunkConfig>(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    return await api.user
      .getUser()
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const deleteAccountAction = createAsyncThunk<string, void, ThunkConfig>(
  "user/deleteAccount",
  async (_, { rejectWithValue }) => {
    return await api.user
      .deleteAccount()
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const editUserAction = createAsyncThunk<string, EditUserArgs, ThunkConfig>(
  "user/editUser",
  async (args, { rejectWithValue }) => {
    return await api.user
      .editUser(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(getUserAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(deleteAccountAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteAccountAction.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteAccountAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(editUserAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(editUserAction.pending, state => {
      state.loading = true
    })
    builder.addCase(editUserAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction } = authSlice.actions
export default authSlice.reducer
