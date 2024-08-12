import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "~api/."
import { TradePoint } from "~api/routes/tradePoints"
import { ThunkConfig, ThunkState } from "~redux/types"

export interface TradePointsState extends ThunkState {
  tradePoints: TradePoint[]
  activeTradePoint?: TradePoint
}

const initialState: TradePointsState = {
  tradePoints: [],
  loading: false
}

export const getTradePointsAction = createAsyncThunk<TradePoint[], void, ThunkConfig>(
  "tradePoints/getTradePoint",
  async (_, { rejectWithValue, getState, dispatch }) => {
    return await api.tradePoints
      .getTradePoints()
      .then(res => {
        const { activeTradePoint } = getState().tradePoints
        if (!activeTradePoint && res.data.length) dispatch(setActiveTradePointAction(res.data[0]))
        return res.data
      })
      .catch(rejectWithValue)
  }
)

const tradePointsSlice = createSlice({
  name: "tradePoints",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    },
    setActiveTradePointAction: (state, action: PayloadAction<TradePoint | undefined>) => {
      state.activeTradePoint = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getTradePointsAction.fulfilled, (state, action) => {
      state.loading = false
      state.tradePoints = action.payload.sort((a, b) => a.recId - b.recId)
    })
    builder.addCase(getTradePointsAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getTradePointsAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction, setActiveTradePointAction } = tradePointsSlice.actions
export default tradePointsSlice.reducer
