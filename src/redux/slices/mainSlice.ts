import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "~api/index"
import { GetMainGraphArgs, MainData, MainGraph } from "~api/routes/main"
import { DateRange, getDayRange } from "~components/DateRangeDropdown"
import { ThunkConfig, ThunkState } from "~redux/types"

export interface MainState extends ThunkState {
  mainData?: MainData
  mainGraph: MainGraph[]
  mainGraphDateRange: DateRange
}

const initialState: MainState = {
  mainGraph: [],
  mainGraphDateRange: getDayRange(),
  loading: false
}

export const getMainAction = createAsyncThunk<MainData, number, ThunkConfig>(
  "main/getMain",
  async (number, { rejectWithValue }) => {
    return await api.main
      .getMain(number)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getMainGraphAction = createAsyncThunk<MainGraph[], GetMainGraphArgs, ThunkConfig>(
  "main/getMainGraph",
  async (args, { rejectWithValue }) => {
    return await api.main
      .getMainGraph(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    },
    setMainGraphDateRangeAction: (state, action: PayloadAction<DateRange>) => {
      state.mainGraphDateRange = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getMainAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getMainAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.mainData = action.payload
    })
    builder.addCase(getMainAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(getMainGraphAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getMainGraphAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.mainGraph = action.payload
    })
    builder.addCase(getMainGraphAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction, setMainGraphDateRangeAction } = mainSlice.actions
export default mainSlice.reducer
