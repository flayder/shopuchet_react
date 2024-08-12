import React from "react"
import Page from "~components/Page"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import cls from "classnames"
import Sales from "./tabs/Sales"
import Incomes from "./tabs/Incomes"
import Returns from "./tabs/Returns"
import useTrade from "~hooks/redux/useTrade"
import WritedOff from "./tabs/WritedOff"

const tabs = ["Продажи", "Приходы", "Возвраты", "Списания"]

const Trade: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Торговля"
  })

  const { tradeTabIndex, setTradeTabIndex } = useTrade()
  const onSelect = (index: number) => {
    setTradeTabIndex(index)
  }
  const isActiveTab = React.useCallback((index: number) => index === tradeTabIndex, [tradeTabIndex])

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}
      <Tabs className="relative" selectedIndex={tradeTabIndex} onSelect={onSelect}>
        <TabList
          id="tab_list"
          className="flex overflow-y-auto whitespace-nowrap no-scrollbar p-0 list-none volume-17 text-primary-blue border-b border-bg-separator"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`tab_${index}`}
              className={cls("cursor-pointer px-3 pb-2 w-full sm:w-40 text-center", {
                "border-b-2": isActiveTab(index)
              })}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <Sales />
        </TabPanel>
        <TabPanel>
          <Incomes />
        </TabPanel>
        <TabPanel>
          <Returns />
        </TabPanel>
        <TabPanel>
          <WritedOff />
        </TabPanel>
      </Tabs>
    </Page>
  )
}

export default Trade
