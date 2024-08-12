import axios from "~api/axios"
import { convertDate } from "~utils/."

export type ConsolidatedReport = {
  sales: {
    cnt: number
    summ: number
    products: number
    avg: number
    income: number
  }
  payed: { cntPayed: number; cach: number; nonCach: number; bonus: number }
  ret: {
    cnt: number
    summ: number
    products: number
  }
  kassa: { inSumm: number; outSumm: number }
}

export type GetConsolidatedReportArgs = { gtochkaid: number; datebegin: Date }

const consolidatedReport = {
  getConsolidatedReport: ({ gtochkaid, datebegin }: GetConsolidatedReportArgs) =>
    axios.get<ConsolidatedReport>(`/api/readconsolidated?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}`)
}

export default consolidatedReport
