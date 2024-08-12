import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "~api/index"
import { GetRemaindersArgs, Remainders } from "~api/routes/remainders"
import { ThunkConfig, ThunkState } from "~redux/types"

const ROWS = 30
const DESCENDING = true

export interface RemaindersState extends ThunkState {
  remainders: Remainders
  filter: string
  cnt?: string
}

const remainders: Remainders = {
  currentPage: -1,
  hasNext: true,
  hasPrevious: false,
  totalPages: 0,
  details: []
}

const initialState: RemaindersState = {
  remainders,
  loading: false,
  filter: ""
}

export interface LoadRemaindersArgs
  extends Omit<GetRemaindersArgs, "cnt" | "filter" | "rows" | "sortField" | "descending"> {}

export const loadRemaindersAction = createAsyncThunk<Remainders, LoadRemaindersArgs, ThunkConfig>(
  "remainders/loadRemainders",
  async (args, { rejectWithValue, getState }) => {
    const { cnt, filter } = getState().remainders

    return await api.remainders
      .getRemainders({
        ...args,
        cnt,
        filter,
        rows: ROWS,
        sortField: "amount",
        descending: DESCENDING
      })
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export interface SearchRemaindersArgs
  extends Omit<LoadRemaindersArgs, "page">,
    Omit<RemaindersState, "remainders" | keyof ThunkState> {}

export const searchRemaindersAction = createAsyncThunk<Remainders, SearchRemaindersArgs, ThunkConfig>(
  "remainders/searchRemainders",
  async (args, { rejectWithValue }) => {
    return await api.remainders
      .getRemainders({
        ...args,
        page: 0,
        rows: ROWS,
        sortField: "amount",
        descending: DESCENDING
      })
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const remaindersSlice = createSlice({
  name: "remainders",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    },
    setFilters: (state, { payload }: PayloadAction<Omit<RemaindersState, "remainders">>) => {
      state.cnt = payload.cnt
      state.filter = payload.filter
    }
  },
  extraReducers: builder => {
    builder.addCase(loadRemaindersAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(loadRemaindersAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.remainders = { ...action.payload, details: [...state.remainders.details, ...action.payload.details] }
    })
    builder.addCase(loadRemaindersAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(searchRemaindersAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(searchRemaindersAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.remainders = action.payload
    })
    builder.addCase(searchRemaindersAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction, setFilters } = remaindersSlice.actions
export default remaindersSlice.reducer
