import React from "react"
import DateRangeAndSort, { OrderBy } from "../componets/DateRangeAndSort"
import cls from "classnames"
import { isEven } from "~utils/index"
import useReports from "~hooks/redux/useReports"
import { DateRange, getDayRange } from "~components/DateRangeDropdown"
import useTradePoints from "~hooks/redux/useTradePoints"
import useInfiniteScroll from "react-infinite-scroll-hook"
import Spinner from "~elements/Spinner"

const ReturnsByProducts: React.FC = () => {
  const { activeTradePoint } = useTradePoints()
  const { returnsByProducts, getReturnsByProducts, loading, error } = useReports()
  const { head, details, currentPage, hasNext } = returnsByProducts || {}

  const [dateRange, setDateRange] = React.useState<DateRange>(getDayRange())
  const [orderBy, setOrderBy] = React.useState<OrderBy>(OrderBy.DESC)

  const onLoadMore = React.useCallback(() => {
    if (activeTradePoint)
      getReturnsByProducts({
        gtochkaid: activeTradePoint.gTochkaId,
        ...dateRange,
        page: currentPage + 1,
        descending: orderBy === OrderBy.DESC
      })
  }, [activeTradePoint, dateRange, currentPage, orderBy])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasNext,
    onLoadMore,
    disabled: !!error
  })

  return (
    <div className="lg:mt-5">
      <DateRangeAndSort dateRange={dateRange} setDateRange={setDateRange} orderBy={orderBy} setOrderBy={setOrderBy} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-2">
        <div className="sm:order-last">
          <div className="p-4  sm:shadow-shadow-1 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-black volume-16 text-gray-2">Всего возвратов:</p>
              <p className="volume-17 text-primary-blue">{head?.cnt}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">На сумму:</p>
              <p className="volume-17 text-primary-blue">{head?.summ.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border-t border-bg-separator">
          <div className="text-gray-40 grid grid-cols-4 px-4 py-2 shadow-shadow-2 sm:shadow-none sm:bg-bg-separator">
            <p className="label-13 col-span-2">Товар</p>
            <p className="label-13 justify-self-end">Кол-во</p>
            <p className="label-13 justify-self-end">Сумма</p>
          </div>

          {details &&
            [...details]
              .sort((a, b) => (orderBy === OrderBy.ASC ? a.summ - b.summ : b.summ - a.summ))
              .map((detail, index) => (
                <div
                  key={`detail_${index}`}
                  className={cls("grid grid-cols-4 px-4 py-2 text-gray-2 border-b border-bg-separator", {
                    "bg-bg-secondary": !isEven(index)
                  })}
                >
                  <p className="col-span-2 label-15 line-clamp-2">{detail.name}</p>
                  <p className="label-13 self-end justify-self-end">{detail.amount?.toFixed(2)}</p>
                  <p className="label-13 self-end justify-self-end">{detail.summ?.toFixed(2)}</p>
                </div>
              ))}

          {loading && (
            <div className="flex justify-center mt-5">
              <Spinner size={30} />
            </div>
          )}

          {hasNext && <div ref={sentryRef} />}
        </div>
      </div>
    </div>
  )
}

export default ReturnsByProducts
