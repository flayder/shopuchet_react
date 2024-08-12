import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "~api/index"
import {
  AvgReceipt,
  GetPaginatedReportArgs,
  GetReportArgs,
  GetTopSalesArgs,
  ReturnsProducts,
  SalesGroups,
  SalesMonth,
  SalesProducts,
  TopSales
} from "~api/routes/reports"
import { ThunkConfig, ThunkState } from "~redux/types"

export interface ReportsState extends ThunkState {
  salesByProducts?: SalesProducts
  salesByGroups?: SalesGroups
  salesByMonth?: SalesMonth
  returnsByProducts: ReturnsProducts
  topSales?: TopSales
  avgReceipt?: AvgReceipt[]
}

const returnsByProducts: ReturnsProducts = {
  currentPage: -1,
  hasNext: true,
  hasPrevious: false,
  totalPages: 0,
  head: {
    cnt: 0,
    summ: 0
  },
  details: []
}

const initialState: ReportsState = {
  loading: false,
  returnsByProducts
}

export const getSalesByProductsAction = createAsyncThunk<SalesProducts, GetReportArgs, ThunkConfig>(
  "reports/getSalesByProducts",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getSalesByProducts(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getSalesByGroupsAction = createAsyncThunk<SalesGroups, GetReportArgs, ThunkConfig>(
  "reports/getSalesByGroups",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getSalesByGroups(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getSalesByMonthAction = createAsyncThunk<SalesMonth, GetReportArgs, ThunkConfig>(
  "reports/getSalesByMonth",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getSalesByMonth(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getReturnsByProductsAction = createAsyncThunk<ReturnsProducts, GetPaginatedReportArgs, ThunkConfig>(
  "reports/getReturnsByProducts",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getReturnsByProducts(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getTopSalesAction = createAsyncThunk<TopSales, GetTopSalesArgs, ThunkConfig>(
  "reports/getTopSales",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getTopSales(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

export const getAvgReceiptAction = createAsyncThunk<AvgReceipt[], GetReportArgs, ThunkConfig>(
  "reports/getAvgReceipt",
  async (args, { rejectWithValue }) => {
    return await api.reports
      .getAvgReceipt(args)
      .then(res => res.data)
      .catch(rejectWithValue)
  }
)

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearErrorAction: state => {
      state.error = undefined
    }
  },
  extraReducers: builder => {
    //GetSalesByProductsAction
    builder.addCase(getSalesByProductsAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getSalesByProductsAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.salesByProducts = action.payload
    })
    builder.addCase(getSalesByProductsAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetSalesByGroupsAction
    builder.addCase(getSalesByGroupsAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getSalesByGroupsAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.salesByGroups = action.payload
    })
    builder.addCase(getSalesByGroupsAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetSalesByMonthAction
    builder.addCase(getSalesByMonthAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getSalesByMonthAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.salesByMonth = action.payload
    })
    builder.addCase(getSalesByMonthAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetReturnsByProductsAction
    builder.addCase(getReturnsByProductsAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getReturnsByProductsAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.returnsByProducts = {
        ...action.payload,
        details: [...state.returnsByProducts.details, ...action.payload.details]
      }
    })
    builder.addCase(getReturnsByProductsAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetTopSalesAction
    builder.addCase(getTopSalesAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getTopSalesAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.topSales = action.payload
    })
    builder.addCase(getTopSalesAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //GetTopSalesAction
    builder.addCase(getAvgReceiptAction.pending, state => {
      state.loading = true
      state.error = undefined
    })
    builder.addCase(getAvgReceiptAction.fulfilled, (state, action) => {
      state.loading = false
      state.error = undefined
      state.avgReceipt = action.payload
    })
    builder.addCase(getAvgReceiptAction.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { clearErrorAction } = reportsSlice.actions
export default reportsSlice.reducer
