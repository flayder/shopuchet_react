import { AxiosResponse } from "axios"
import axios from "~api/axios"
import { convertDate } from "~utils/."

export type SalesProduct = {
  amount: number
  gProductId: number
  name: string
  price: number
  remainder: number
}

export type SalesDetail = {
  date: string
  products: SalesProduct[]
  recId: number
  summ: number
  zakazId: number
}

export type Sale = {
  cnt: number
  income: number
  summ: number
}

export type Sales = {
  sales: Sale
  details: SalesDetail[]
}

export type GProduct = {
  gProductId: number
  usersId: number
  recId: number
  parentId: number
  articul: string
  barcode: string
  name: string
  price: number
  isCategory: number
  isActive: number
}

export type SkladItemDetail = {
  skladDetailsId: number
  recId: number
  gProduct: GProduct
  amount: number
  price: number
  remainAmount: number
}

export type SkladDetail = {
  skladId: number
  usersId: number
  recId: number
  gTochkaId: number
  date: string
  summ: number
  summCash: number
  summNoncash: number
  type: number
  isChange: number
  details: SkladItemDetail[]
}

export type SkladHead = {
  cntReceipt: number
  cntReturn: number
  sumReceipt: number
  sumReturn: number
}

export type Sklad = {
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  totalPages: number
  details: SkladDetail[]
  head: SkladHead
}

export type ZakazInfoHead = {
  date: string
  payedSumm: number
  recId: number
  summ: number
  summBonus: number
  summCash: number
  summNoncash: number
}

export type ZakazInfoDetail = {
  amount: number
  gProductId: number
  name: string
  price: number
  remainder: number
  summ: number
}

export type ZakazInfo = {
  head: ZakazInfoHead
  details: ZakazInfoDetail[]
}

export type GProductsSale = {
  gProductId: number
  amount: number
  cost: number
}

export type GProductsReceipt = {
  gProductId: number
  amount: number
  price: number
}

export type Body = {
  summ: number
  summCash: number
  summNoncash: number
  summBonus: number
  date: string
}

export interface SellBody extends Body {
  gTochkaId: number
  gProducts: GProductsSale[]
}
export interface SellEditBody extends Body {
  zakazId: number
  gProducts: GProductsSale[]
}
export interface ReceiptBody extends Body {
  gTochkaId: number
  type: number
  gProducts: GProductsReceipt[]
}
export interface ReceiptEditBody extends Body {
  skladId: number
  gProducts: GProductsReceipt[]

  type: number
}

export type GetTrageArgs = {
  gtochkaid: number
  datebegin: Date
  dateend: Date
}

export type GetPaginatedTradeArgs = GetTrageArgs & {
  page: number
}

const trade = {
  getSales: ({ gtochkaid, datebegin, dateend }: GetTrageArgs) =>
    axios.get<Sales>(
      `/api/readsales?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(dateend)}`
    ),
  getIncome: ({ gtochkaid, datebegin, dateend, page }: GetPaginatedTradeArgs) =>
    axios.get<Sklad>(
      `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}&page=${page}&rows=10&type=0`
    ),
  getReturn: ({ gtochkaid, datebegin, dateend, page }: GetPaginatedTradeArgs) =>
    axios.get<Sklad>(
      `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(
        dateend
      )}&page=${page}&rows=10&type=1`
    ),
  getWritedOff: ({ gtochkaid, datebegin, dateend }: GetTrageArgs) =>
    axios.get<Sales>(
      `/api/readwritedoff?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(dateend)}`
    ),
  getZakazInfo: (zakazid: number) => axios.get<ZakazInfo>(`/api/readzakazdetails?zakazid=${zakazid}`),
  deleteSale: (zakazIds: number[]) => axios.post<object, AxiosResponse<object>, number[]>("/api/deletesales", zakazIds),
  deleteReceipt: (skladIds: number[]) =>
    axios.post<object, AxiosResponse<object>, number[]>("/api/deletereceipt", skladIds),
  sell: (data: SellBody) => axios.post<string, AxiosResponse<string>, SellBody>("/api/sell", data),
  sellEdit: (data: SellEditBody) => axios.post<string, AxiosResponse<string>, SellEditBody>("/api/selledit", data),
  receipt: (data: ReceiptBody) => axios.post<string, AxiosResponse<string>, ReceiptBody>("/api/receipt", data),
  receiptEdit: (data: ReceiptEditBody) =>
    axios.post<string, AxiosResponse<string>, ReceiptEditBody>("/api/receiptedit", data)
}

export default trade
