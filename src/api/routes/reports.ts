import axios from "~api/axios"
import { convertDate } from "~utils/."

export type SalesProductsHead = {
  cnt: number
  summ: number
  income: number
}

export type SalesProductsDetails = {
  name: string
  amount: number
  summ: number
  income: number
}

export type SalesProducts = {
  head: SalesProductsHead
  details: SalesProductsDetails[]
}

export type SalesGroupsHead = {
  cnt: number
  summ: number
  income: number
}

export type SalesGroupsDetails = {
  name: string
  amount: number
  summ: number
  income: number
}

export type SalesGroups = {
  head: SalesGroupsHead
  details: SalesGroupsDetails[]
}

export type SalesMonthHead = {
  cnt: number
  summ: number
  income: number
}

export type SalesMonthDetails = {
  month: string
  amount: number
  summ: number
  income: number
}

export type SalesMonth = {
  head: SalesMonthHead
  details: SalesMonthDetails[]
}

export type ReturnsProductsHead = {
  cnt: number
  summ: number
}

export type ReturnsProductsDetail = {
  amount: number
  name: string
  summ: number
}

export type ReturnsProducts = {
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  totalPages: number
  head: ReturnsProductsHead
  details: ReturnsProductsDetail[]
}

export type TopSalesHead = {
  cnt: number
  summ: number
}

export type TopSalesDetail = {
  amount: number
  name: string
}

export type TopSales = {
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  totalPages: number
  head: TopSalesHead
  details: TopSalesDetail[]
}

export type AvgReceipt = {
  avg: number
  date: string
}

export type GetReportArgs = {
  gtochkaid: number
  datebegin: Date
  dateend: Date
}

export type GetPaginatedReportArgs = GetReportArgs & {
  page: number
  descending?: boolean
}

export type GetTopSalesArgs = GetReportArgs & {
  descending: boolean
}

const reports = {
  getSalesByProducts: ({ gtochkaid, datebegin, dateend }: GetReportArgs) =>
    axios.get<SalesProducts>(
      `/api/readsalesproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}`
    ),
  getSalesByGroups: ({ gtochkaid, datebegin, dateend }: GetReportArgs) =>
    axios.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}`
    ),
  getSalesByMonth: ({ gtochkaid, datebegin, dateend }: GetReportArgs) =>
    axios.get<SalesMonth>(
      `/api/readsalesgroupmonth?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}`
    ),
  getReturnsByProducts: ({ gtochkaid, datebegin, dateend, page, descending = true }: GetPaginatedReportArgs) =>
    axios.get<ReturnsProducts>(
      `/api/readreturnsproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}&page=${page}&descending=${descending}&rows=10&sortField=summ`
    ),
  getTopSales: ({ gtochkaid, datebegin, dateend, descending }: GetTopSalesArgs) =>
    axios.get<TopSales>(
      `/api/readtopsalesproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}&descending=${descending}&page=0&rows=4&sortField=amount`
    ),
  getAvgReceipt: ({ gtochkaid, datebegin, dateend }: GetReportArgs) =>
    axios.get<AvgReceipt[]>(
      `/api/readaveragezakaz?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(dateend)}`
    )
}

export default reports
