import { RemaindersDetail } from "~api/routes/remainders"

export type Icon = {
  className?: string
  onClick?(): void
}

export type TradeForm = {
  date: Date
  discount: string
  details: RemaindersDetail[]
  summCash: number
  summNoncash: number
  summBonus: number
}
