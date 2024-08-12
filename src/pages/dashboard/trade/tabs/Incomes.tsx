import React from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { useNavigate } from "react-router-dom"
import { SkladDetail } from "~api/routes/trade"
import DateRangeDropdown from "~components/DateRangeDropdown"
import BottomSheet, { BottomSheetAction } from "~components/ui/BottomSheet"
import Modal from "~components/ui/Modal"
import Button from "~elements/Button"
import Spinner from "~elements/Spinner"
import useTrade from "~hooks/redux/useTrade"
import useTradePoints from "~hooks/redux/useTradePoints"
import useBreakpoints from "~hooks/useBreakpoints"
import Edit from "~icons/Edit"
import MoreVertical from "~icons/MoreVertical"
import Trash from "~icons/Trash"
import DeleteModal from "../components/DeleteModal"
import { IncomeState } from "../cruds/Income"

const Incomes: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const toIncome = (state: IncomeState) => () => navigate("income", { state })

  const { activeTradePoint } = useTradePoints()
  const { dateRange, setDateRange, income, getIncome, deleteReceipt, loading, error } = useTrade()
  const { head, details, currentPage, hasNext } = income

  const fetchIncome = React.useCallback(
    (page: number) => {
      if (activeTradePoint) getIncome({ gtochkaid: activeTradePoint.gTochkaId, ...dateRange, page })
    },
    [activeTradePoint, dateRange]
  )

  React.useEffect(() => {
    fetchIncome(0)
  }, [fetchIncome])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasNext,
    onLoadMore: () => fetchIncome(currentPage + 1),
    disabled: !!error
  })

  const [incomeToDelete, setIncomeToDelete] = React.useState<number | null>(null)
  const onSetIncomeToDelete = (deleteId: number | null) => () => setIncomeToDelete(deleteId)

  const [showActions, setShowActions] = React.useState<number | null>(null)
  const toggleShowActions = (itemId: number | null) => () => setShowActions(itemId)

  const onDelete = (deleteId: number | null) => {
    if (deleteId)
      deleteReceipt(deleteId)
        .then(() => fetchIncome(0))
        .then(toggleShowActions(null))
  }

  const getDate = React.useCallback(
    (item: SkladDetail) => {
      const dateArray = item.date.split(" ")
      return dateRange.index === 0 ? "в " + dateArray[1] : "от " + [dateArray[0]]
    },
    [dateRange]
  )

  const actions: BottomSheetAction[] = [
    {
      title: "Редактировать",
      onClick: itemId => toIncome({ variant: "edit", detail: details.find(d => d.skladId === itemId) })()
    },
    {
      title: "Удалить",
      onClick: setIncomeToDelete,
      className: "text-danger"
    }
  ]

  const RenderNewButton: React.FC = React.useCallback(() => {
    return (
      <div className="px-4 mr-auto">
        <Button className={isMobile ? "primary" : ""} onClick={toIncome({ variant: "new" })}>
          Новый приход
        </Button>
      </div>
    )
  }, [isMobile])

  return (
    <div className="lg:mt-5 relative">
      <div className="flex items-center justify-end lg:mb-5 absolute sm:static right-0 -top-30 sm:-top-18 right-4 sm:right-0">
        {!isMobile && <RenderNewButton />}
        {false && <Spinner {...(isMobile ? { color: "white" } : {})} className="mr-2" size={20} />}
        <DateRangeDropdown dateRange={dateRange} setDateRange={setDateRange} negative={isMobile} />
      </div>

      {isMobile && <RenderNewButton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-2">
        <div className="sm:order-last">
          <div className="p-4  sm:shadow-shadow-1 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-black volume-16 text-gray-2">Всего приходов:</p>
              <p className="volume-17 text-primary-blue">{head.cntReceipt || 0}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">На сумму:</p>
              <p className="volume-17 text-primary-blue">{head.sumReceipt?.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 px-4">
          {details.map((item, index) => (
            <div key={`sale_${index}`} className="flex mb-4">
              <div className="flex-1 border border-bg-separator grid grid-cols-4">
                <div className="col-span-3 p-2 border-r border-bg-separator">
                  <p
                    onClick={toIncome({ variant: "preview", detail: item })}
                    className="text-[12px] sm:text-[14px] font-bold text-primary-blue transition hover:text-bg-primary cursor-pointer"
                  >
                    Чек № {item.recId} {getDate(item)}
                  </p>
                  {item.details.slice(0, 3).map(prod => (
                    <p key={prod.gProduct.gProductId} className="text-[10px] sm:text-[12px] text-gray-70 truncate">
                      {prod.gProduct.name}
                    </p>
                  ))}
                  {item.details.length > 3 && (
                    <p className="text-[12px]">... ещё позиций - {item.details.length - 3}шт.</p>
                  )}
                </div>
                <div className="p-2 flex flex-col items-center justify-center">
                  {item.details.slice(0, 3).map(prod => (
                    <p key={`prod_math_${prod.recId}`} className="text-[10px] sm:text-[12px] text-gray-70">
                      {prod.price.toFixed(2)} х {prod.amount.toFixed(2)}
                    </p>
                  ))}
                  <p className="text-[14px] font-bold text-primary-blue">= {item.summ.toFixed(2)}</p>
                </div>
              </div>
              {isMobile ? (
                <div className="flex items-center justify-center">
                  <button className="text-primary-blue py-2" onClick={toggleShowActions(item.skladId)}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col px-2">
                  <button title="Редактировать" onClick={toIncome({ variant: "edit", detail: item })}>
                    <Edit className="text-primary-blue" />
                  </button>
                  <button className="mt-2" title="Удалить" onClick={onSetIncomeToDelete(item.skladId)}>
                    <Trash className="text-danger" />
                  </button>
                </div>
              )}
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

      <Modal open={!!incomeToDelete} onClose={onSetIncomeToDelete(null)}>
        <DeleteModal label="приход" onClose={onSetIncomeToDelete(null)} deleteId={incomeToDelete} onDelete={onDelete} />
      </Modal>

      <BottomSheet open={!!showActions} itemId={showActions} onClose={toggleShowActions(null)} actions={actions} />
    </div>
  )
}

export default Incomes
