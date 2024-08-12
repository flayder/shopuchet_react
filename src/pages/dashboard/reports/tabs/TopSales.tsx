import React from "react"
import DateRangeAndSort, { OrderBy } from "../componets/DateRangeAndSort"
import useReports from "~hooks/redux/useReports"
import { DateRange, getDayRange } from "~components/DateRangeDropdown"
import useTradePoints from "~hooks/redux/useTradePoints"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const backgroundColors = ["#69DFAE", "#6395FA", "#6D7FA0", "#F7C122"]

const TopSales: React.FC = () => {
  const { activeTradePoint } = useTradePoints()
  const { topSales, getTopSales } = useReports()
  const { head, details } = topSales || {}

  const [dateRange, setDateRange] = React.useState<DateRange>(getDayRange())
  const [orderBy, setOrderBy] = React.useState<OrderBy>(OrderBy.DESC)

  React.useEffect(() => {
    if (activeTradePoint)
      getTopSales({ gtochkaid: activeTradePoint.gTochkaId, ...dateRange, descending: orderBy === OrderBy.DESC })
  }, [activeTradePoint, dateRange, orderBy])

  return (
    <div className="lg:mt-5">
      <DateRangeAndSort dateRange={dateRange} setDateRange={setDateRange} orderBy={orderBy} setOrderBy={setOrderBy} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-2">
        <div className="sm:order-last border-b sm:border-none border-bg-separator">
          <div className="p-4  sm:shadow-shadow-1 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-black volume-16 text-gray-2">Продано товаров:</p>
              <p className="volume-17 text-primary-blue">{head?.cnt}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">На сумму:</p>
              <p className="volume-17 text-primary-blue">{head?.summ.toFixed(2)}</p>
            </div>

            <div className="border-b border-bg-separator my-2" />

            {details?.map((detail, index) => (
              <div key={`detail_${index}`} className="flex items-center justify-between mt-1">
                <div className="w-2 h-2 rounded-full  mr-1" style={{ backgroundColor: backgroundColors[index] }} />
                <p className="text-black label-13 text-gray-2 flex-1 !leading-tight line-clamp-2">{detail.name}</p>
                <p className="label-13 font-bold text-gray-2">{detail.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 px-4">
          <Doughnut
            data={{
              labels: [],
              datasets: [{ data: details?.map(d => d.amount), backgroundColor: backgroundColors }]
            }}
            width={500}
            height={500}
            options={{
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  formatter: (value, ctx) => {
                    let sum = 0
                    let dataArr = ctx.chart.data.datasets[0].data
                    dataArr.map(data => {
                      sum += data as number
                    })
                    let percentage = (value * 100) / sum + "%"
                    return percentage
                  },
                  color: "white",
                  font: { size: 16 }
                },
                tooltip: {
                  enabled: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TopSales
