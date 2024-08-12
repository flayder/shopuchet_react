import React from "react"
import toast from "react-hot-toast"
import { GetPaginatedReportArgs, GetReportArgs, GetTopSalesArgs } from "~api/routes/reports"
import {
  clearErrorAction,
  getAvgReceiptAction,
  getReturnsByProductsAction,
  getSalesByGroupsAction,
  getSalesByMonthAction,
  getSalesByProductsAction,
  getTopSalesAction
} from "~redux/slices/reportsSlice"
import { useAppDispatch, useAppSelector } from "."

const useReports = () => {
  const { salesByProducts, salesByGroups, salesByMonth, returnsByProducts, topSales, avgReceipt, loading, error } =
    useAppSelector(state => state.reports)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [clearErrorAction])

  const getSalesByProducts = (args: GetReportArgs) => dispatch(getSalesByProductsAction(args))
  const getSalesByGroups = (args: GetReportArgs) => dispatch(getSalesByGroupsAction(args))
  const getSalesByMonth = (args: GetReportArgs) => dispatch(getSalesByMonthAction(args))
  const getReturnsByProducts = (args: GetPaginatedReportArgs) => dispatch(getReturnsByProductsAction(args))
  const getTopSales = (args: GetTopSalesArgs) => dispatch(getTopSalesAction(args))
  const getAvgReceipt = (args: GetReportArgs) => dispatch(getAvgReceiptAction(args))

  return {
    salesByProducts,
    getSalesByProducts,
    salesByGroups,
    getSalesByGroups,
    salesByMonth,
    getSalesByMonth,
    returnsByProducts,
    getReturnsByProducts,
    topSales,
    getTopSales,
    avgReceipt,
    getAvgReceipt,
    loading,
    error
  }
}

export default useReports
