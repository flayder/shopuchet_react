import * as yup from "yup"

export function toQueryString<T>(params: T) {
  return Object.entries(params as Object)
    .map(([key, value]) =>
      value !== undefined && value !== null && String(value).length !== 0 ? `${key}=${value}` : ""
    )
    .join("&")
}

export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]

function pad(s: number) {
  return s < 10 ? "0" + s : s
}

export function convertDate(inputFormat: Date | string, fetch: boolean = true): string {
  const d = new Date(inputFormat)
  if (!fetch) return d.getDate() + " " + monthNames[d.getMonth()].toLowerCase().slice(0, 3) + "."
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(".")
}

export function convertDateTime(inputFormat: Date | string): string {
  const d = new Date(inputFormat)
  const date = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(".")
  const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":")
  return date + " " + time
}

export const translate = {
  dashboard: "Панель управления",
  "trade-point": "Выбрать торговую точку",
  main: "Главная",
  "con-report": "Сводный отчет",
  trade: "Торговля",
  reports: "Отчеты",
  remainders: "Товарные остатки",
  friends: "Список друзей",
  profile: "Профиль",
  sale: "Продажа",
  income: "Приход",
  return: "Возврат"
}

//@ts-ignore
export const getTranslate = (name: string): string => translate[name] || name

export const addSpaces = (value?: number, fixed: boolean = true): string => {
  const stringVal = fixed ? value?.toFixed(2) : value?.toString()
  if (fixed && stringVal) {
    const parts = stringVal?.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return parts.join(".")
  }
  return stringVal?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || ""
}

export const isEven = (num: number): boolean => num % 2 === 0

const NUM_REG = /^[0-9\b]+$/
const PRICE_REG = /^\d*\.?\d*$/

const testNum = yup.string().test("is_num", "Поле должно быть числом!", val => !!val?.match(NUM_REG))
const testFloat = yup.string().test("is_float", "Поле должно быть числом!", val => !!val?.match(PRICE_REG))

export const tradeFormValidationSchema = yup
  .object({
    discount: testNum,
    details: yup.array().of(
      yup.object({
        amount: testNum,
        cost: testFloat
      })
    ),
    summCash: testFloat,
    summNoncash: testFloat,
    summBonus: testFloat
  })
  .required()
