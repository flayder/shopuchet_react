import React from "react"
import DateRangeDropdown, { DateRange } from "~components/DateRangeDropdown"
import Spinner from "~elements/Spinner"
import useReports from "~hooks/redux/useReports"
import { Sort } from "~icons/."
import { convertDate } from "~utils/."
import cls from "classnames"

export enum OrderBy {
  ASC,
  DESC
}

type Props = {
  dateRange: DateRange
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
  orderBy: OrderBy
  setOrderBy: React.Dispatch<React.SetStateAction<OrderBy>>
}

const DateRangeAndSort: React.FC<Props> = ({ dateRange, setDateRange, orderBy, setOrderBy }) => {
  const { loading } = useReports()

  const onOrderChange = () => setOrderBy(orderBy === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC)

  return (
    <div className="flex items-center sm:justify-end px-4 py-2">
      {loading && <Spinner size={15} className="mr-2" />}
      <p className="label-15 text-text-disable  mr-auto sm:mr-4">
        {convertDate(dateRange.datebegin, false)} - {convertDate(dateRange.dateend, false)}
      </p>

      <DateRangeDropdown dateRange={dateRange} setDateRange={setDateRange} />

      <button className="transition hover:opacity-75 active:opacity-75 ml-4" onClick={onOrderChange}>
        <Sort
          className={cls("transition text-primary-cloud transform", {
            "rotate-180": orderBy === OrderBy.ASC
          })}
        />
      </button>
    </div>
  )
}

export default DateRangeAndSort
