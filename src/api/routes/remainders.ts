import axios from "~api/axios"
import { toQueryString } from "~utils/."

export type RemaindersDetail = {
  remaindersId: number
  amount: number
  name: string
  groupName: string
  gProductId: number
  cost: number
}

export type Remainders = {
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  totalPages: number
  details: RemaindersDetail[]
}

export type GetRemaindersArgs = {
  gtochkaid: number
  page: number
  cnt?: string
  filter?: string
  rows?: number
  sortField: "amount"
  descending: boolean
}

const remainders = {
  getRemainders: (args: GetRemaindersArgs) => axios.get<Remainders>(`/api/remainders?${toQueryString(args)}`)
}

export default remainders
