import React from "react"
import toast from "react-hot-toast"
import { GetMainGraphArgs } from "~api/routes/main"
import { DateRange } from "~components/DateRangeDropdown"
import {
  clearErrorAction,
  getMainAction,
  getMainGraphAction,
  setMainGraphDateRangeAction
} from "~redux/slices/mainSlice"
import { useAppDispatch, useAppSelector } from "."
import useTradePoints from "./useTradePoints"

const useMain = () => {
  const { activeTradePoint } = useTradePoints()
  const { loading, error, mainData, mainGraph, mainGraphDateRange } = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const getMain = React.useCallback(() => {
    if (activeTradePoint) dispatch(getMainAction(activeTradePoint.gTochkaId))
  }, [activeTradePoint])

  const getMainGraph = React.useCallback(() => {
    if (activeTradePoint) dispatch(getMainGraphAction({ gtochkaid: activeTradePoint.gTochkaId, ...mainGraphDateRange }))
  }, [activeTradePoint, mainGraphDateRange])

  const setMainGraphDateRange = (dateRange: DateRange) => dispatch(setMainGraphDateRangeAction(dateRange))

  return { loading, mainData, mainGraph, mainGraphDateRange, getMain, getMainGraph, setMainGraphDateRange }
}

export default useMain
