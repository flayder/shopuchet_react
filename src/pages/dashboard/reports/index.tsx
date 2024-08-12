import React from "react"
import Page from "~components/Page"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import cls from "classnames"
import Chevron from "~icons/Chevron"
import SalesByProducts from "./tabs/SalesByProducts"
import SalesByGroups from "./tabs/SalesByGroups"
import SalesByMonth from "./tabs/SalesByMonth"
import ReturnsByProducts from "./tabs/ReturnsByProducts"
import TopSales from "./tabs/TopSales"
import AvgReceipt from "./tabs/AvgReceipt"

const tabs = [
  "Продажи по товарам",
  "Продажи по группам",
  "Продажи по месяцам",
  "Возвраты по товарам",
  "Топ продаваемых товаров",
  "Средний чек (по дням)"
]

const Reports: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Отчеты"
  })

  const [tabIndex, setTabIndex] = React.useState<number>(0)
  const onSelect = (index: number) => setTabIndex(index)
  const isActiveTab = React.useCallback((index: number) => index === tabIndex, [tabIndex])

  const [tabListElement, setTabListElement] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    const tabList = document.getElementById("tab_list")
    setTabListElement(tabList)
  }, [])

  const scrollToStart = () => tabListElement?.scrollTo({ left: 0, behavior: "smooth" })
  const scrollToEnd = () => tabListElement?.scrollTo({ left: tabListElement.scrollWidth, behavior: "smooth" })

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}

      <Tabs className="relative" selectedIndex={tabIndex} onSelect={onSelect}>
        <button className="absolute top-[2px] -left-4 lg:-left-6" onClick={scrollToStart}>
          <Chevron className="transform rotate-180" />
        </button>
        <TabList
          id="tab_list"
          className="flex overflow-y-auto whitespace-nowrap no-scrollbar p-0 list-none volume-17 text-primary-blue"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`tab_${index}`}
              className={cls("cursor-pointer px-3 pb-2", {
                "border-b-2": isActiveTab(index)
              })}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <button className="absolute top-[2px] -right-4 lg:-right-6" onClick={scrollToEnd}>
          <Chevron />
        </button>

        <TabPanel>
          <SalesByProducts />
        </TabPanel>
        <TabPanel>
          <SalesByGroups />
        </TabPanel>
        <TabPanel>
          <SalesByMonth />
        </TabPanel>
        <TabPanel>
          <ReturnsByProducts />
        </TabPanel>
        <TabPanel>
          <TopSales />
        </TabPanel>
        <TabPanel>
          <AvgReceipt />
        </TabPanel>
      </Tabs>
    </Page>
  )
}

export default Reports
