import React from "react"
import { DateRange, getDayRange } from "~components/DateRangeDropdown"
import DateRangeAndSort, { OrderBy } from "../componets/DateRangeAndSort"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import useTradePoints from "~hooks/redux/useTradePoints"
import useReports from "~hooks/redux/useReports"
import { addSpaces } from "~utils/index"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = ["January", "February", "March", "April", "May", "June", "July"]

const AvgReceipt: React.FC = () => {
  const { activeTradePoint } = useTradePoints()
  const { avgReceipt, getAvgReceipt } = useReports()

  const [dateRange, setDateRange] = React.useState<DateRange>(getDayRange())
  const [orderBy, setOrderBy] = React.useState<OrderBy>(OrderBy.DESC)

  React.useEffect(() => {
    if (activeTradePoint) getAvgReceipt({ gtochkaid: activeTradePoint.gTochkaId, ...dateRange })
  }, [activeTradePoint, dateRange])

  return (
    <div className="lg:mt-5">
      <DateRangeAndSort dateRange={dateRange} setDateRange={setDateRange} orderBy={orderBy} setOrderBy={setOrderBy} />
      <Bar
        options={{
          indexAxis: "y" as const,
          elements: {},
          responsive: true,
          plugins: { tooltip: { enabled: false }, datalabels: { color: "white" }, legend: { display: false } }
        }}
        data={{
          labels: avgReceipt?.map(avg => avg.date),
          datasets: [
            {
              data: avgReceipt?.map(({ avg }) => avg),
              backgroundColor: "#0066FF"
            }
          ]
        }}
      />
    </div>
  )
}

export default AvgReceipt
