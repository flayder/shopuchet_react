import axios from "~api/axios"

export type TradePoint = {
  gTochkaId: number
  usersId: number
  recId: number
  name: string
}

const tradePoints = {
  getTradePoints: () => axios.get<TradePoint[]>(`/api/readgtochka`)
}

export default tradePoints
