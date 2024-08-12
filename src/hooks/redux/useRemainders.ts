import React from "react"
import toast from "react-hot-toast"
import {
  clearErrorAction,
  loadRemaindersAction,
  LoadRemaindersArgs,
  searchRemaindersAction,
  SearchRemaindersArgs
} from "~redux/slices/remaindersSlice"
import { useAppDispatch, useAppSelector } from "."

const useRemainders = () => {
  const { remainders, loading, error } = useAppSelector(state => state.remainders)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const loadRemainders = (args: LoadRemaindersArgs) => dispatch(loadRemaindersAction(args))
  const searchRemainders = (args: SearchRemaindersArgs) => dispatch(searchRemaindersAction(args))

  return { remainders, loading, error, loadRemainders, searchRemainders }
}

export default useRemainders
