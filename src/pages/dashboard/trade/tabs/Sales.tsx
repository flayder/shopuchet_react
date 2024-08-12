import React from "react"
import { useNavigate } from "react-router-dom"
import { SalesDetail } from "~api/routes/trade"
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
import { convertDateTime } from "~utils/index"
import DeleteModal from "../components/DeleteModal"
import { SaleState } from "../cruds/Sale"

const Sales: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const toSale = (state: SaleState) => () => navigate("sale", { state })

  const { activeTradePoint } = useTradePoints()
  const { clearZakazInfo, dateRange, setDateRange, sales, getSales, deleteSale, loading } = useTrade()

  const fetchSales = React.useCallback(() => {
    if (activeTradePoint) getSales({ gtochkaid: activeTradePoint.gTochkaId, ...dateRange })
  }, [activeTradePoint, dateRange])

  React.useEffect(() => {
    fetchSales()
  }, [fetchSales])

  React.useEffect(() => {
    clearZakazInfo()
  }, [clearZakazInfo])

  const [zakazToDelete, setZakazToDelete] = React.useState<number | null>(null)
  const onSetZakazToDelete = (deleteId: number | null) => () => setZakazToDelete(deleteId)

  const [showActions, setShowActions] = React.useState<number | null>(null)
  const toggleShowActions = (itemId: number | null) => () => setShowActions(itemId)

  const onDelete = (deleteId: number | null) => {
    if (deleteId) deleteSale(deleteId).then(fetchSales).then(toggleShowActions(null))
  }

  const getDate = React.useCallback(
    (item: SalesDetail) => {
      const dateTimeString = convertDateTime(item.date)
      return dateRange.index === 0 ? "в " + dateTimeString.slice(10) : "от " + dateTimeString.slice(0, 10)
    },
    [dateRange]
  )

  const actions: BottomSheetAction[] = [
    {
      title: "Редактировать",
      onClick: zakazId => toSale({ variant: "edit", zakazId: zakazId || undefined })()
    },
    {
      title: "Удалить",
      onClick: setZakazToDelete,
      className: "text-danger"
    }
  ]

  const RenderNewButton: React.FC = React.useCallback(() => {
    return (
      <div className="px-4 mr-auto">
        <Button className={isMobile ? "primary" : ""} onClick={toSale({ variant: "new" })}>
          Новая продажа
        </Button>
      </div>
    )
  }, [isMobile])

  return (
    <div className="lg:mt-5 relative">
      <div className="flex items-center justify-end lg:mb-5 absolute sm:static right-0 -top-30 sm:-top-18 right-4 sm:right-0">
        {!isMobile && <RenderNewButton />}
        {loading && <Spinner {...(isMobile ? { color: "white" } : {})} className="mr-2" size={20} />}
        <DateRangeDropdown dateRange={dateRange} setDateRange={setDateRange} negative={isMobile} />
      </div>

      {isMobile && <RenderNewButton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-2">
        <div className="sm:order-last">
          <div className="p-4  sm:shadow-shadow-1 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-black volume-16 text-gray-2">Всего продаж:</p>
              <p className="volume-17 text-primary-blue">{sales?.sales.cnt}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">На сумму:</p>
              <p className="volume-17 text-primary-blue">{sales?.sales.summ.toFixed(2) || "0.00"}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-black volume-16 text-gray-2">Прибыль:</p>
              <p className="volume-17 text-primary-blue">{sales?.sales.income.toFixed(2) || "0.00"}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 px-4">
          {sales?.details.map((item, index) => (
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
              {isMobile ? (
                <div className="flex items-center justify-center">
                  <button
                    className="text-primary-blue active:opacity-70 py-2"
                    onClick={toggleShowActions(item.zakazId)}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col px-2">
                  <button title="Редактировать">
                    <Edit className="text-primary-blue" onClick={toSale({ variant: "edit", zakazId: item.zakazId })} />
                  </button>
                  <button className="mt-2" title="Удалить" onClick={onSetZakazToDelete(item.zakazId)}>
                    <Trash className="text-danger" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!zakazToDelete} onClose={onSetZakazToDelete(null)}>
        <DeleteModal label="продажу" onClose={onSetZakazToDelete(null)} deleteId={zakazToDelete} onDelete={onDelete} />
      </Modal>

      <BottomSheet open={!!showActions} itemId={showActions} onClose={toggleShowActions(null)} actions={actions} />
    </div>
  )
}

export default Sales
