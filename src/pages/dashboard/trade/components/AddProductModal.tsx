import React from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { RemaindersDetail } from "~api/routes/remainders"
import Button from "~elements/Button"
import Input from "~elements/Input"
import Spinner from "~elements/Spinner"
import useRemainders from "~hooks/redux/useRemainders"
import useTradePoints from "~hooks/redux/useTradePoints"
import Search from "~icons/Search"

type Props = {
  onClose(): void
  onSelect(detail: RemaindersDetail): void
}

const AddProductModal: React.FC<Props> = ({ onClose, onSelect }) => {
  const { activeTradePoint } = useTradePoints()
  const { loading, error, remainders, loadRemainders, searchRemainders } = useRemainders()

  const [filter, setFilter] = React.useState<string>("")
  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)

  React.useEffect(() => {
    if (activeTradePoint) searchRemainders({ gtochkaid: activeTradePoint?.gTochkaId, filter })
  }, [filter, activeTradePoint])

  const onLoadMore = React.useCallback(() => {
    if (activeTradePoint)
      loadRemainders({
        gtochkaid: activeTradePoint.gTochkaId,
        page: remainders.currentPage + 1
      })
  }, [activeTradePoint, remainders])

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: remainders.hasNext,
    onLoadMore,
    disabled: !!error
  })

  const handleSelect = (detail: RemaindersDetail) => () => {
    onClose()
    onSelect(detail)
  }

  return (
    <div>
      <p className="volume-22 text-center text-primary-blue">Добавить товар</p>
      <Input LeftIcon={Search} className="my-5" value={filter} onChange={onChangeFilter} placeholder="Искать..." />

      <div ref={rootRef} className="overflow-y-auto h-80 pb-2">
        {remainders.details.map(item => (
          <div
            onClick={handleSelect(item)}
            key={item.remaindersId}
            className="cursor-pointer my-2 grid grid-cols-4 items-center justify-center border border-bg-separator text-primary-blue hover:bg-bg-secondary"
          >
            <p className="col-span-2 p-2 truncate">{item.name}</p>
            <p className="text-center border-l border-bg-separator p-2">{item.amount}</p>
            <p className="text-center border-l border-bg-separator p-2">{item.cost?.toFixed(2)}</p>
          </div>
        ))}

        {loading && (
          <div className="flex justify-center mt-5">
            <Spinner size={30} />
          </div>
        )}

        {remainders.hasNext && <div ref={sentryRef} />}
      </div>

      <Button className="uppercase mt-5" onClick={onClose}>
        Отмена
      </Button>
    </div>
  )
}

export default AddProductModal
