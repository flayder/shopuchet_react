import React from "react"
import toast from "react-hot-toast"
import { GetConsolidatedReportArgs } from "~api/routes/consolidatedReport"
import { clearErrorAction, getConReportAction } from "~redux/slices/conReportSlice"
import { useAppDispatch, useAppSelector } from "."

const useConReport = () => {
  const { loading, error, conReport } = useAppSelector(state => state.conReport)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const getConReport = (args: GetConsolidatedReportArgs) => dispatch(getConReportAction(args))

  return { conReport, loading, getConReport }
}

export default useConReport
