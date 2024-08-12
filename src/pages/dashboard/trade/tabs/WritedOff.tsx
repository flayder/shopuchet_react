import React from "react"
import { useNavigate } from "react-router-dom"
import { SalesDetail } from "~api/routes/trade"
import DateRangeDropdown from "~components/DateRangeDropdown"
import Spinner from "~elements/Spinner"
import useTrade from "~hooks/redux/useTrade"
import useTradePoints from "~hooks/redux/useTradePoints"
import useBreakpoints from "~hooks/useBreakpoints"
import { convertDateTime } from "~utils/index"
import { SaleState } from "../cruds/Sale"

const WritedOff: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const toSale = (state: SaleState) => () => navigate("sale", { state })

  const { activeTradePoint } = useTradePoints()
  const { dateRange, setDateRange, writedOff, getWritedOff, loading } = useTrade()

  const fetchWritedOff = React.useCallback(() => {
    if (activeTradePoint) getWritedOff({ gtochkaid: activeTradePoint.gTochkaId, ...dateRange })
  }, [activeTradePoint, dateRange])

  React.useEffect(() => {
    fetchWritedOff()
  }, [fetchWritedOff])

  const getDate = React.useCallback(
    (item: SalesDetail) => {
      const dateTimeString = convertDateTime(item.date)
      return dateRange.index === 0 ? "в " + dateTimeString.slice(10) : "от " + dateTimeString.slice(0, 10)
    },
    [dateRange]
  )

  return (
    <div className="lg:mt-5 relative">
      <div className="flex items-center justify-end lg:mb-5 absolute sm:static right-0 -top-30 sm:-top-18 right-4 sm:right-0">
        {loading && <Spinner {...(isMobile ? { color: "white" } : {})} className="mr-2" size={20} />}
        <DateRangeDropdown dateRange={dateRange} setDateRange={setDateRange} negative={isMobile} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-2">
        <div className="sm:order-last">
          <div className="p-4  sm:shadow-shadow-1 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-black volume-16 text-gray-2">Всего продаж:</p>
              <p className="volume-17 text-primary-blue">{writedOff?.sales.cnt}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">На сумму:</p>
              <p className="volume-17 text-primary-blue">{writedOff?.sales.summ.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">Прибыль:</p>
              <p className="volume-17 text-primary-blue">{writedOff?.sales.income.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 px-4">
          {writedOff?.details.map((item, index) => (
            <div key={`sale_${index}`} className="flex mb-4">
              <div className="flex-1 border border-bg-separator grid grid-cols-4">
                <div className="col-span-3 p-2 border-r border-bg-separator">
                  <p
                    onClick={toSale({ variant: "preview", zakazId: item.zakazId })}
                    className="text-[12px] sm:text-[14px] font-bold text-primary-blue transition hover:text-bg-primary cursor-pointer"
                  >
                    Чек № {item.recId} {getDate(item)}
                  </p>
                  {item.products.slice(0, 3).map(prod => (
                    <p key={prod.gProductId} className="text-[10px] sm:text-[12px] text-gray-70 truncate">
                      {prod.name}
                    </p>
                  ))}
                  {item.products.length > 3 && (
                    <p className="text-[12px]">... ещё позиций - {item.products.length - 3}шт.</p>
                  )}
                </div>
                <div className="p-2 flex flex-col items-center justify-center">
                  {item.products.slice(0, 3).map(prod => (
                    <p key={`prod_math_${prod.gProductId}`} className="text-[10px] sm:text-[12px] text-gray-70">
                      {prod.price.toFixed(2)} х {prod.amount.toFixed(2)}
                    </p>
                  ))}
                  <p className="text-[14px] font-bold text-primary-blue">= {item.summ.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WritedOff
