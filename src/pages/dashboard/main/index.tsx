import React from "react"
import Preloader from "~components/loaders/Preloader"
import Page from "~components/Page"
import useMain from "~hooks/redux/useMain"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import { addSpaces } from "~utils/."
import Graph from "./components/Graph"
import MainReport from "./components/MainReport"

const Main: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Главная"
  })

  const { getMain, mainData, getMainGraph } = useMain()

  React.useEffect(() => {
    getMain()
    getMainGraph()
  }, [getMain, getMainGraph])

  return (
    <Page title={headerTitle} className="px-4">
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}
      <div className="py-3 border-b border-bg-separator border-dashed flex items-center justify-between sm:justify-end text-primary-blue">
        <p className="volume-17 mr-2">В кассе на сегодня:</p>
        <p className="volume-17">{addSpaces(mainData?.summ || 0)}</p>
      </div>
      <MainReport mainData={mainData} />
      <Graph />
    </Page>
  )
}

export default Main
