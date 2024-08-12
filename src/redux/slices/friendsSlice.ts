import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~api/index"
import { Friend } from "~api/routes/friends"
import { ThunkConfig, ThunkState } from "~redux/types"

type Friends = {
  usersId: number
  login: string
  gTochkaId: number[]
  nameGTochka: string[]
}[]

export interface FriendsState extends ThunkState {
  friends: Friends
}

const initialState: FriendsState = {
  loading: false,
  friends: []
}

export const getFriendsAction = createAsyncThunk<Friend[], void, ThunkConfig>(
  "friends/getFriends",
  async (_, { rejectWithValue }) => {
    return await api.friends
      .getFriends()
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const linkUserAction = createAsyncThunk<string, { login: string; gtochkaids: string }, ThunkConfig>(
  "friends/linkUser",
  async ({ login, gtochkaids }, { rejectWithValue }) => {
    return await api.friends
      .linkUser(login, gtochkaids)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    }
  },
  extraReducers: builder => {
    builder.addCase(getFriendsAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getFriendsAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined

      const result = action.payload.reduce<Friends>((prev, cur) => {
        const next = [...prev]
        const index = prev.findIndex(p => p.usersId === cur.usersId)

        if (index !== -1) {
          next[index].gTochkaId = [...next[index].gTochkaId, cur.gTochkaId]
          next[index].nameGTochka = [...next[index].nameGTochka, cur.nameGTochka]
        } else next.push({ ...cur, gTochkaId: [cur.gTochkaId], nameGTochka: [cur.nameGTochka] })

        return next
      }, [])

      state.friends = result
    })
    builder.addCase(getFriendsAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(linkUserAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(linkUserAction.fulfilled, state => {
      state.loading = false
      state.error = undefined
    })
    builder.addCase(linkUserAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction } = friendsSlice.actions
export default friendsSlice.reducer
