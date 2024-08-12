import React from "react"
import DateRangeDropdown from "~components/DateRangeDropdown"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import useMain from "~hooks/redux/useMain"
import { convertDate } from "~utils/index"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Graph: React.FC = () => {
  const { mainGraph, mainGraphDateRange, setMainGraphDateRange } = useMain()

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between sm:justify-end">
        <p className="mr-5 label-13 text-text-disable">
          {convertDate(mainGraphDateRange.datebegin, false)} - {convertDate(mainGraphDateRange.dateend, false)}
        </p>
        <DateRangeDropdown dateRange={mainGraphDateRange} setDateRange={setMainGraphDateRange} />
      </div>
      <div className="py-5">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const
              },
              title: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          }}
          data={{
            labels: mainGraph.map(g => convertDate(g.date)),
            datasets: [
              {
                label: "Продажи",
                data: mainGraph.map(g => g.summ),
                borderColor: "#0066FF",
                backgroundColor: "#0066FF"
              },
              {
                label: "Прибыль",
                data: mainGraph.map(g => g.income),
                borderColor: "#96C0FF",
                backgroundColor: "#96C0FF"
              }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default Graph
