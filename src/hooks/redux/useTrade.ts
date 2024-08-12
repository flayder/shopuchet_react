import React from "react"
import toast from "react-hot-toast"
import {
  GetPaginatedTradeArgs,
  GetTrageArgs,
  ReceiptBody,
  ReceiptEditBody,
  SellBody,
  SellEditBody
} from "~api/routes/trade"
import { DateRange } from "~components/DateRangeDropdown"
import {
  clearErrorAction,
  createReceiptAction,
  createSaleAction,
  deleteReceiptAction,
  deleteSaleAction,
  editReceiptAction,
  editSaleAction,
  getIncomeAction,
  getReturnAction,
  getSalesAction,
  getZakazInfoAction,
  setIncomePaymentTabIndexAction,
  setDateRangeAction,
  setReturnPaymentTabIndexAction,
  setSalePaymentTabIndexAction,
  setTradeTabIndexAction,
  clearZakazInfoAction,
  getWritedOffAction
} from "~redux/slices/tradeSlice"
import { useAppDispatch, useAppSelector } from "."

const useTrade = () => {
  const {
    tradeTabIndex,
    salePaymentTabIndex,
    incomePaymentTabIndex,
    returnPaymentTabIndex,
    dateRange,
    sales,
    zakazInfo,
    income,
    returns,
    writedOff,
    loading,
    error
  } = useAppSelector(state => state.trade)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const setTradeTabIndex = (index: number) => dispatch(setTradeTabIndexAction(index))
  const setSalePaymentTabIndex = (index: number) => dispatch(setSalePaymentTabIndexAction(index))
  const setIncomePaymentTabIndex = (index: number) => dispatch(setIncomePaymentTabIndexAction(index))
  const setReturnPaymentTabIndex = (index: number) => dispatch(setReturnPaymentTabIndexAction(index))

  const setDateRange = (dateRange: DateRange) => dispatch(setDateRangeAction(dateRange))

  const getSales = (args: GetTrageArgs) => dispatch(getSalesAction(args))
  const getZakazInfo = (zakazId: number) => dispatch(getZakazInfoAction(zakazId))
  const deleteSale = async (zakazId: number) =>
    await dispatch(deleteSaleAction([zakazId]))
      .unwrap()
      .then(obj => {
        //@ts-ignore
        toast.success(obj[zakazId])
      })
  const createSale = async (sellBody: SellBody) =>
    await dispatch(createSaleAction(sellBody)).unwrap().then(toast.success)
  const editSale = async (sellEditBody: SellEditBody) =>
    await dispatch(editSaleAction(sellEditBody)).unwrap().then(toast.success)

  const getIncome = (args: GetPaginatedTradeArgs) => dispatch(getIncomeAction(args))
  const getReturn = (args: GetPaginatedTradeArgs) => dispatch(getReturnAction(args))
  const getWritedOff = (args: GetTrageArgs) => dispatch(getWritedOffAction(args))

  const deleteReceipt = async (skladId: number) =>
    await dispatch(deleteReceiptAction([skladId]))
      .unwrap()
      .then(obj => {
        //@ts-ignore
        toast.success(obj[skladId])
      })
  const createReceipt = async (receiptBody: ReceiptBody) =>
    await dispatch(createReceiptAction(receiptBody)).unwrap().then(toast.success)
  const editReceipt = async (receiptEditBody: ReceiptEditBody) =>
    await dispatch(editReceiptAction(receiptEditBody)).unwrap().then(toast.success)

  const clearZakazInfo = () => dispatch(clearZakazInfoAction())

  return {
    tradeTabIndex,
    setTradeTabIndex,
    salePaymentTabIndex,
    setSalePaymentTabIndex,
    incomePaymentTabIndex,
    setIncomePaymentTabIndex,
    returnPaymentTabIndex,
    setReturnPaymentTabIndex,
    dateRange,
    setDateRange,
    sales,
    getSales,
    deleteSale,
    createSale,
    editSale,
    zakazInfo,
    getZakazInfo,
    income,
    getIncome,
    returns,
    getReturn,
    writedOff,
    getWritedOff,
    deleteReceipt,
    createReceipt,
    editReceipt,
    clearZakazInfo,
    loading,
    error
  }
}

export default useTrade
