import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "~api/index"
import {
  GetPaginatedTradeArgs,
  GetTrageArgs,
  ReceiptBody,
  ReceiptEditBody,
  Sales,
  SellBody,
  SellEditBody,
  Sklad,
  ZakazInfo
} from "~api/routes/trade"
import { DateRange, getDayRange } from "~components/DateRangeDropdown"
import { ThunkConfig, ThunkState } from "~redux/types"

export interface TradeState extends ThunkState {
  sales?: Sales
  zakazInfo?: ZakazInfo
  income: Sklad
  returns: Sklad
  writedOff?: Sales

  tradeTabIndex: number
  salePaymentTabIndex: number
  incomePaymentTabIndex: number
  returnPaymentTabIndex: number

  dateRange: DateRange
}

const initialSklad: Sklad = {
  currentPage: -1,
  hasNext: true,
  hasPrevious: false,
  totalPages: 0,
  details: [],
  head: {
    cntReceipt: 0,
    cntReturn: 0,
    sumReceipt: 0,
    sumReturn: 0
  }
}

const initialState: TradeState = {
  loading: false,
  income: initialSklad,
  returns: initialSklad,
  tradeTabIndex: 0,
  salePaymentTabIndex: 0,
  incomePaymentTabIndex: 0,
  returnPaymentTabIndex: 0,
  dateRange: getDayRange()
}

export const getSalesAction = createAsyncThunk<Sales, GetTrageArgs, ThunkConfig>(
  "trade/getSales",
  async (args, { rejectWithValue }) => {
    return await api.trade
      .getSales(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getZakazInfoAction = createAsyncThunk<ZakazInfo, number, ThunkConfig>(
  "trade/getZakazInfo",
  async (zakazId, { rejectWithValue }) => {
    return await api.trade
      .getZakazInfo(zakazId)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const createSaleAction = createAsyncThunk<string, SellBody, ThunkConfig>(
  "trade/createSale",
  async (sellBody, { rejectWithValue }) => {
    return await api.trade
      .sell(sellBody)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const editSaleAction = createAsyncThunk<string, SellEditBody, ThunkConfig>(
  "trade/editSale",
  async (sellEditBody, { rejectWithValue }) => {
    return await api.trade
      .sellEdit(sellEditBody)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getIncomeAction = createAsyncThunk<Sklad, GetPaginatedTradeArgs, ThunkConfig>(
  "trade/getIncome",
  async (args, { rejectWithValue }) => {
    return await api.trade
      .getIncome(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getReturnAction = createAsyncThunk<Sklad, GetPaginatedTradeArgs, ThunkConfig>(
  "trade/getReturn",
  async (args, { rejectWithValue }) => {
    return await api.trade
      .getReturn(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getWritedOffAction = createAsyncThunk<Sales, GetTrageArgs, ThunkConfig>(
  "trade/getWritedOff",
  async (args, { rejectWithValue }) => {
    return await api.trade
      .getWritedOff(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const deleteSaleAction = createAsyncThunk<object, number[], ThunkConfig>(
  "trade/deleteSale",
  async (zakazIds, { rejectWithValue }) => {
    return await api.trade
      .deleteSale(zakazIds)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const deleteReceiptAction = createAsyncThunk<object, number[], ThunkConfig>(
  "trade/deleteReceipt",
  async (skladIds, { rejectWithValue }) => {
    return await api.trade
      .deleteReceipt(skladIds)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const createReceiptAction = createAsyncThunk<string, ReceiptBody, ThunkConfig>(
  "trade/createReceipt",
  async (receiptBody, { rejectWithValue }) => {
    return await api.trade
      .receipt(receiptBody)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const editReceiptAction = createAsyncThunk<string, ReceiptEditBody, ThunkConfig>(
  "trade/editReceipt",
  async (receiptEditBody, { rejectWithValue }) => {
    return await api.trade
      .receiptEdit(receiptEditBody)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    },
    setTradeTabIndexAction: (state, action: PayloadAction<number>) => {
      state.tradeTabIndex = action.payload
    },
    setSalePaymentTabIndexAction: (state, action: PayloadAction<number>) => {
      state.salePaymentTabIndex = action.payload
    },
    setIncomePaymentTabIndexAction: (state, action: PayloadAction<number>) => {
      state.incomePaymentTabIndex = action.payload
    },
    setReturnPaymentTabIndexAction: (state, action: PayloadAction<number>) => {
      state.returnPaymentTabIndex = action.payload
    },
    setDateRangeAction: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload
    },
    clearZakazInfoAction: state => {
      state.zakazInfo = undefined
    }
  },
  extraReducers: builder => {
    //GetSales
    builder.addCase(getSalesAction.fulfilled, (state, action) => {
      state.loading = false
      state.sales = action.payload
    })
    builder.addCase(getSalesAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getSalesAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetZakazInfo
    builder.addCase(getZakazInfoAction.fulfilled, (state, action) => {
      state.loading = false
      state.zakazInfo = action.payload
    })
    builder.addCase(getZakazInfoAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getZakazInfoAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //CreateSale
    builder.addCase(createSaleAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(createSaleAction.pending, state => {
      state.loading = true
    })
    builder.addCase(createSaleAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //EditSale
    builder.addCase(editSaleAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(editSaleAction.pending, state => {
      state.loading = true
    })
    builder.addCase(editSaleAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetIncome
    builder.addCase(getIncomeAction.fulfilled, (state, action) => {
      state.loading = false
      state.income =
        action.payload.currentPage === 0
          ? action.payload
          : { ...action.payload, details: [...state.income.details, ...action.payload.details] }
    })
    builder.addCase(getIncomeAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getIncomeAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetReturn
    builder.addCase(getReturnAction.fulfilled, (state, action) => {
      state.loading = false
      state.returns =
        action.payload.currentPage === 0
          ? action.payload
          : { ...action.payload, details: [...state.income.details, ...action.payload.details] }
    })
    builder.addCase(getReturnAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getReturnAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetWritedOff
    builder.addCase(getWritedOffAction.fulfilled, (state, action) => {
      state.loading = false
      state.writedOff = action.payload
    })
    builder.addCase(getWritedOffAction.pending, state => {
      state.loading = true
    })
    builder.addCase(getWritedOffAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //DeleteSale
    builder.addCase(deleteSaleAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteSaleAction.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteSaleAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //DeleteReceipt
    builder.addCase(deleteReceiptAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteReceiptAction.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteReceiptAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //CreateReceipt
    builder.addCase(createReceiptAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(createReceiptAction.pending, state => {
      state.loading = true
    })
    builder.addCase(createReceiptAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //EditReceipt
    builder.addCase(editReceiptAction.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(editReceiptAction.pending, state => {
      state.loading = true
    })
    builder.addCase(editReceiptAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const {
  clearErrorAction,
  setTradeTabIndexAction,
  setSalePaymentTabIndexAction,
  setIncomePaymentTabIndexAction,
  setReturnPaymentTabIndexAction,
  setDateRangeAction,
  clearZakazInfoAction
} = tradeSlice.actions
export default tradeSlice.reducer
