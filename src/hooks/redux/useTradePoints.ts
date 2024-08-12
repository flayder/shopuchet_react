import { TradePoint } from "~api/routes/tradePoints"
import { getTradePointsAction, setActiveTradePointAction } from "~redux/slices/tradePointsSlice"
import { useAppDispatch, useAppSelector } from "."

const useTradePoints = () => {
  const { tradePoints, activeTradePoint, loading } = useAppSelector(state => state.tradePoints)
  const dispatch = useAppDispatch()

  const getTradePoints = () => dispatch(getTradePointsAction())

  const setActiveTradePoint = (tradePoint: TradePoint | undefined) => dispatch(setActiveTradePointAction(tradePoint))

  return { tradePoints, activeTradePoint, loading, getTradePoints, setActiveTradePoint }
}

export default useTradePoints
