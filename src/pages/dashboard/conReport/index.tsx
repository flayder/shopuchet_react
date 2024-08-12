import React from "react"
import Page from "~components/Page"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import Chevron from "~icons/Chevron"
import DatePicker from "react-datepicker"
import useConReport from "~hooks/redux/useConReport"
import useTradePoints from "~hooks/redux/useTradePoints"
import { addSpaces } from "~utils/index"

const ConReport: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Сводный отчет"
  })

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  const { activeTradePoint } = useTradePoints()
  const { conReport, getConReport } = useConReport()
  const { sales, payed, ret, kassa } = conReport || {}

  React.useEffect(() => {
    if (activeTradePoint)
      getConReport({
        datebegin: selectedDate,
        gtochkaid: activeTradePoint.gTochkaId
      })
  }, [activeTradePoint, selectedDate])

  const next = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const prev = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}

      <div className="px-4 py-3 flex items-center justify-center sm:justify-start border-b border-bg-separator">
        {!isMobile && <p className="volume-17 text-primary-blue">Дата:</p>}
        {isMobile && (
          <button className="p-2 active:opacity-50" onClick={prev}>
            <Chevron className="transform rotate-180" />
          </button>
        )}
        <DatePicker
          wrapperClassName="!w-auto"
          className="text-center"
          dateFormat="dd.MM.yyyy"
          selected={selectedDate}
          onChange={date => date && setSelectedDate(date)}
          maxDate={new Date()}
        />
        {!isMobile && (
          <button className="p-2 active:opacity-50" onClick={prev}>
            <Chevron className="transform rotate-180" />
          </button>
        )}
        <button className="p-2 active:opacity-50" onClick={next}>
          <Chevron />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex py-4 mx-4 border-b border-bg-separator border-dashed">
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">Всего продаж:</p>
            <p className="volume-17 text-primary-blue">На сумму:</p>
            <p className="label-15 text-gray-2 mt-2">Товаров</p>
            <p className="label-15 text-gray-2">Средний чек</p>
            <p className="label-15 text-gray-2">Прибыль</p>
          </div>
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">{sales?.cnt || 0}</p>
            <p className="volume-17 text-primary-blue">{addSpaces(sales?.summ || 0)}</p>
            <p className="label-15 text-gray-2 mt-2">{sales?.products || 0}</p>
            <p className="label-15 text-gray-2">{addSpaces(sales?.avg || 0)}</p>
            <p className="label-15 text-gray-2">{addSpaces(sales?.income || 0)}</p>
          </div>
        </div>

        <div className="flex py-4 mx-4 border-b border-bg-separator">
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">Оплачено:</p>
            <p className="label-15 text-gray-2 mt-2">Наличными</p>
            <p className="label-15 text-gray-2">Безналом</p>
            <p className="label-15 text-gray-2">Бонусами</p>
          </div>
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">
              {addSpaces(payed?.cach || 0 + (payed?.nonCach || 0) + (payed?.bonus || 0))}
            </p>
            <p className="label-15 text-gray-2 mt-2">{addSpaces(payed?.cach || 0)}</p>
            <p className="label-15 text-gray-2">{addSpaces(payed?.nonCach || 0)}</p>
            <p className="label-15 text-gray-2">{addSpaces(payed?.bonus || 0)}</p>
          </div>
        </div>

        <div className="flex p-4 border-b sm:border-none border-bg-separator">
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">Всего возвратов:</p>
            <p className="volume-17 text-primary-blue">На сумму:</p>
            <p className="label-15 text-gray-2 mt-2">Товаров</p>
          </div>
          <div className="flex-1">
            <p className="volume-17 text-primary-blue">{ret?.cnt || 0}</p>
            <p className="volume-17 text-primary-blue">{addSpaces(ret?.summ || 0)}</p>
            <p className="label-15 text-gray-2 mt-2">{ret?.products || 0}</p>
          </div>
        </div>

        {!isMobile && <div />}

        <div className="flex p-4">
          <div className="flex-1">
            <p className="label-15 text-gray-2 mt-2">Изъято из кассы</p>
            <p className="label-15 text-gray-2 mt-2">Внесено в кассу</p>
          </div>
          <div className="flex-1">
            <p className="label-15 text-gray-2 mt-2">{addSpaces(kassa?.outSumm || 0)}</p>
            <p className="label-15 text-gray-2 mt-2">{addSpaces(kassa?.inSumm || 0)}</p>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ConReport
