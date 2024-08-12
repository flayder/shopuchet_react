import React, { useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import { CalendarMonth, CalendarWeek, CheckMark, Clock, DateIcon } from "~icons/."
import cls from "classnames"
import Modal from "./ui/Modal"
import DatePicker from "react-datepicker"

export type DateRange = {
  index: number
  datebegin: Date
  dateend: Date
}

type DateRangeItem = {
  icon: React.ReactNode
  label: string
  rangeType: "day" | "week" | "month" | "any"
}

export const getDayRange = (): DateRange => {
  const date = new Date()
  return { index: 0, datebegin: date, dateend: new Date() }
}

export const getWeekRange = (): DateRange => {
  const date = new Date()
  return { index: 1, datebegin: new Date(date.setDate(date.getDate() - 7)), dateend: new Date() }
}

export const getMonthRange = (): DateRange => {
  const date = new Date()
  return { index: 2, datebegin: new Date(date.setMonth(date.getMonth() - 1)), dateend: new Date() }
}

export const dateRangeItems: DateRangeItem[] = [
  {
    icon: <DateIcon />,
    label: "День",
    rangeType: "day"
  },
  {
    icon: <CalendarWeek />,
    label: "Неделя",
    rangeType: "week"
  },
  {
    icon: <CalendarMonth />,
    label: "Месяц",
    rangeType: "month"
  },
  {
    icon: <Clock />,
    label: "Любой срок",
    rangeType: "any"
  }
]

type Props = {
  dateRange: DateRange
  setDateRange(dateRange: DateRange): void
  negative?: boolean
}

const DateRangeDropdown: React.FC<Props> = ({ dateRange, setDateRange, negative }) => {
  const [dateRangeItem, setDateRangeItem] = React.useState<DateRangeItem>(dateRangeItems[0])
  const isActive = (range: DateRangeItem) => range.label === dateRangeItem.label

  useEffect(() => {
    setDateRangeItem(dateRangeItems[dateRange.index])
  }, [dateRange])

  const [showSelectDateRangeModal, setShowSelectDateRangeModal] = React.useState<boolean>(false)

  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    setDateRange({
      index: 3,
      datebegin: start,
      dateend: end
    })
  }

  const onSetCurrentRange = (range: DateRangeItem) => () => {
    setDateRangeItem(range)
    setStartDate(new Date())
    setEndDate(null)
    switch (range.rangeType) {
      case "day":
        setDateRange(getDayRange())
        break
      case "week":
        setDateRange(getWeekRange())
        break
      case "month":
        setDateRange(getMonthRange())
        break
      default:
        setShowSelectDateRangeModal(true)
    }
  }

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button>
          <div
            className={cls(
              "transition cursor-pointer flex items-center bg-primary-blue hover:bg-bg-primary active:bg-bg-primary text-bg-white p-2 rounded-xl",
              {
                "bg-bg-white hover:bg-bg-separator text-primary-blue": negative
              }
            )}
          >
            {dateRangeItem.icon}
            <p className="label-dropdown-14 ml-2">{dateRangeItem.label}</p>
          </div>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bg-bg-white rounded-xl shadow-shadow-2 w-40 top-0 right-0">
            {dateRangeItems.map((item, index) => (
              <Menu.Item
                onClick={onSetCurrentRange(item)}
                key={`dropdown_item_${index}`}
                as="div"
                className={cls(
                  "h-10 px-2 flex items-center cursor-pointer text-primary-blue transition hover:bg-bg-secondary",
                  {
                    "rounded-t-xl": index === 0,
                    "rounded-b-xl": index === dateRangeItems.length - 1,
                    "bg-bg-dropdown hover:bg-bg-dropdown": isActive(item)
                  }
                )}
              >
                {item.icon}
                <p className="ml-2 label-dropdown-14">{item.label}</p>
                {isActive(item) && <CheckMark className="ml-auto" />}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <Modal open={showSelectDateRangeModal} onClose={() => setShowSelectDateRangeModal(false)}>
        <div className="text-center">
          <p className="text-primary-blue text-[24px] font-bold mb-10">Выберите даты</p>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div className="flex mt-10">
            <button className="btn flex-1 mr-1" onClick={() => setShowSelectDateRangeModal(false)}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DateRangeDropdown
