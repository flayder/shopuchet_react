import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~api/index"
import { ConsolidatedReport, GetConsolidatedReportArgs } from "~api/routes/consolidatedReport"
import { ThunkConfig, ThunkState } from "~redux/types"

export interface ConReportState extends ThunkState {
  conReport?: ConsolidatedReport
}

const initialState: ConReportState = {
  loading: false
}

export const getConReportAction = createAsyncThunk<ConsolidatedReport, GetConsolidatedReportArgs, ThunkConfig>(
  "conReport/getConReport",
  async (args, { rejectWithValue }) => {
    return await api.consolidatedReport
      .getConsolidatedReport(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const conReportSlice = createSlice({
  name: "conReport",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    }
  },
  extraReducers: builder => {
    builder.addCase(getConReportAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getConReportAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.conReport = action.payload
    })
    builder.addCase(getConReportAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction } = conReportSlice.actions
export default conReportSlice.reducer
