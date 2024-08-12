import React from "react"
import { MainData } from "~api/routes/main"
import { addSpaces } from "~utils/."

type Props = {
  mainData?: MainData
}

const MainReport: React.FC<Props> = ({ mainData }) => {
  const { day, week, month } = mainData || {}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:mt-5">
      <div className="pt-2 pb-6 border-b border-bg-separator border-dashed sm:px-2">
        <p className="text-center volume-17 text-primary-blue">Сегодня</p>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Продаж:</p>
          <p className="label-15 font-bold text-primary-blue">{day?.cnt || 0}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">На сумму:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(day?.summ || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Прибыль:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(day?.income || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Средний чек:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(day?.avg || 0)}</p>
        </div>
      </div>

      <div className="pt-2 pb-6 border-b border-bg-separator border-dashed sm:px-2 sm:border-l sm:border-r">
        <p className="text-center volume-17 text-primary-blue">За последние 7 дней</p>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Продаж:</p>
          <p className="label-15 font-bold text-primary-blue">{week?.cnt || 0}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">На сумму:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(week?.summ || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Прибыль:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(week?.income || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Средний чек:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(week?.avg || 0)}</p>
        </div>
      </div>

      <div className="pt-2 pb-6 border-b border-bg-separator border-dashed sm:px-2">
        <p className="text-center volume-17 text-primary-blue">За последние 30 дней</p>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Продаж:</p>
          <p className="label-15 font-bold text-primary-blue">{month?.cnt || 0}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">На сумму:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(month?.summ || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Прибыль:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(month?.income || 0)}</p>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="label-15 text-gray-2">Средний чек:</p>
          <p className="label-15 font-bold text-primary-blue">{addSpaces(week?.avg || 0)}</p>
        </div>
      </div>
    </div>
  )
}

export default MainReport
