import axios from "~api/axios"
import { convertDate } from "~utils/."

export type MainDataObject = {
  avg: number
  cnt: number
  income: number
  summ: number
}

export type MainData = {
  day: MainDataObject
  month: MainDataObject
  week: MainDataObject
  summ: number
}

export type MainGraph = {
  date: string
  cnt: number
  summ: number
  income: number
}

export type GetMainGraphArgs = {
  gtochkaid: number
  datebegin: Date
  dateend: Date
}

const main = {
  getMain: (gtochkaid: number) => axios.get<MainData>(`/api/readmain?gtochkaid=${gtochkaid}`),

  getMainGraph: ({ gtochkaid, datebegin, dateend }: GetMainGraphArgs) =>
    axios.get<MainGraph[]>(
      `/api/readmaingraph?gtochkaid=${gtochkaid}&datebegin=${convertDate(datebegin)}&dateend=${convertDate(dateend)}`
    )
}

export default main
