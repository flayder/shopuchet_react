import React from "react"
import Page from "~components/Page"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import cls from "classnames"
import { isEven } from "~utils/index"
import Filter from "./components/Filter"
import useRemainders from "~hooks/redux/useRemainders"
import useTradePoints from "~hooks/redux/useTradePoints"
import useInfiniteScroll from "react-infinite-scroll-hook"
import Spinner from "~elements/Spinner"

const Remainders: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Товарные остатки"
  })

  const { activeTradePoint } = useTradePoints()
  const { loading, error, remainders, loadRemainders } = useRemainders()

  const onLoadMore = React.useCallback(() => {
    if (activeTradePoint)
      loadRemainders({
        gtochkaid: activeTradePoint.gTochkaId,
        page: remainders.currentPage + 1
      })
  }, [activeTradePoint, remainders])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: remainders.hasNext,
    onLoadMore,
    disabled: !!error
  })

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}
      {isMobile && <Filter />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-4">
        <div className="lg:col-span-2 border-t border-bg-separator">
          <div className="text-gray-40 grid grid-cols-4 px-4 py-2 shadow-shadow-2 sm:shadow-none sm:bg-bg-separator">
            <p className="label-13 col-span-3">Товар</p>
            <p className="label-13 justify-self-end">Остаток</p>
          </div>

          {remainders.details.map((rem, id) => (
            <div
              key={`remainder_${id}`}
              className={cls("grid grid-cols-4 px-4 py-2 text-gray-2 border-b border-bg-separator", {
                "bg-bg-secondary": isEven(id)
              })}
            >
              <div className="col-span-3 self-end">
                <p className="volume-17">{rem.groupName}</p>
                <p className="label-13 mt-1 line-clamp-2">{rem.name}</p>
              </div>
              <p className="label-15 self-end justify-self-end">{rem.amount.toFixed(1)}</p>
            </div>
          ))}

          {loading && (
            <div className="flex justify-center mt-5">
              <Spinner size={30} />
            </div>
          )}

          {remainders.hasNext && <div ref={sentryRef} />}
        </div>

        {!isMobile && (
          <div>
            <Filter />
          </div>
        )}
      </div>
    </Page>
  )
}

export default Remainders
