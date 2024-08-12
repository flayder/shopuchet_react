import React from "react"
import { TradePoint as TradePointType } from "~api/routes/tradePoints"
import Page from "~components/Page"
import useNavbars from "~hooks/redux/useNavbars"
import useTradePoints from "~hooks/redux/useTradePoints"
import useBreakpoints from "~hooks/useBreakpoints"
import CheckMark from "~icons/CheckMark"
import cls from "classnames"

const TradePoint: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Выбрать торговую точку"
  })

  const { tradePoints, activeTradePoint, setActiveTradePoint, getTradePoints } = useTradePoints()

  React.useEffect(() => {
    getTradePoints()
  }, [])

  const isActive = React.useCallback(
    (gTochkaId: number) => activeTradePoint?.gTochkaId === gTochkaId,
    [activeTradePoint]
  )

  const setActiveTp = (tradePoint: TradePointType) => () => setActiveTradePoint(tradePoint)

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}

      <div className="mt-0 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {tradePoints.map(tp => (
          <div
            key={tp.gTochkaId}
            onClick={setActiveTp(tp)}
            className={cls(
              "flex relative sm:flex-col p-4 justify-between items-center text-primary-blue border-b sm:border-none sm:shadow-shadow-2 sm:rounded-lg border-bg-separator border-dashed",
              {
                "!active:bg-bg-secondary cursor-pointer": isMobile
              }
            )}
            style={{
              background:
                isActive(tp.gTochkaId) && isMobile
                  ? "linear-gradient(90deg, #DDE6FF 0%, rgba(199, 214, 255, 0) 100%)"
                  : "none"
            }}
          >
            <p className="volume-17 sm:mt-10">{tp.name}</p>
            {isActive(tp.gTochkaId) && <CheckMark className="sm:absolute top-4 right-4" />}
            {!isMobile && (
              <button
                className={cls("btn mt-10 w-full", {
                  "pointer-events-none": isActive(tp.gTochkaId),
                  primary: !isActive(tp.gTochkaId)
                })}
              >
                {isActive(tp.gTochkaId) ? "Выбрано" : "Выбрать"}
              </button>
            )}
          </div>
        ))}
      </div>
    </Page>
  )
}

export default TradePoint
