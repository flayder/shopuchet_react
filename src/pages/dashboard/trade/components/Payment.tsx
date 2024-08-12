import React from "react"
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import cls from "classnames"
import Switch from "~elements/Switch"
import Input from "~elements/Input"
import { Controller, useFormContext } from "react-hook-form"
import { TradeForm } from "~types/index"

const tabs = ["Наличные", "Безнал", "Смешанный"]

type Props = {
  tabIndex: number
  setTabIndex: (index: number) => void
}

const Payment: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  const { control, watch, setValue } = useFormContext<TradeForm>()
  const [summCash, summNoncash] = watch(["summCash", "summNoncash"])

  const onSelect = (index: number) => {
    if (tabIndex === 0 && index === 1) {
      setValue("summNoncash", summCash)
      setValue("summCash", 0)
    }

    if (tabIndex === 1 && index === 0) {
      setValue("summCash", summNoncash)
      setValue("summNoncash", 0)
    }

    setTabIndex(index)
  }
  const isActiveTab = React.useCallback((index: number) => index === tabIndex, [tabIndex])

  const [bonusEnabled, setBonusEnabled] = React.useState<boolean>(false)

  const CacheField: React.FC = React.useCallback(() => {
    return (
      <Controller
        control={control}
        name="summCash"
        render={({ field, fieldState: { error } }) => <Input className="mt-2" error={error?.message} {...field} />}
      />
    )
  }, [control])

  const NoncacheField: React.FC = React.useCallback(() => {
    return (
      <Controller
        control={control}
        name="summNoncash"
        render={({ field, fieldState: { error } }) => <Input className="mt-2" error={error?.message} {...field} />}
      />
    )
  }, [control])

  const BonusField: React.FC = React.useCallback(() => {
    return (
      <Controller
        control={control}
        name="summBonus"
        render={({ field, fieldState: { error } }) => <Input className="mt-2" error={error?.message} {...field} />}
      />
    )
  }, [control])

  return (
    <div className="py-6">
      <p className="input-18 text-gray-2 text-center">Способ оплаты</p>
      <Tabs selectedIndex={tabIndex} onSelect={onSelect}>
        <TabList className="flex whitespace-nowrap p-0 list-none label-13 h-14 bg-bg-white border rounded-lg border-bg-separator">
          {tabs.map((tab, index) => (
            <Tab
              key={`tab_${index}`}
              className={cls(
                "transition flex-1 flex items-center justify-center cursor-pointer uppercase text-primary-blue rounded-lg",
                {
                  "bg-primary-blue !text-bg-white": isActiveTab(index)
                }
              )}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <div className="flex justify-between mb-4">
          <p className="text-gray-2">Оплата бонусами:</p>
          <Switch enabled={bonusEnabled} setEnabled={setBonusEnabled} />
        </div>

        <TabPanel>
          <p className="text-gray-2 text-center">Сумма к оплате</p>
          <CacheField />
          {bonusEnabled && (
            <>
              <p className="text-gray-2 text-center mt-2">Сумма бонусами</p>
              <BonusField />
            </>
          )}
        </TabPanel>
        <TabPanel>
          <p className="text-gray-2 text-center">Сумма к оплате</p>
          <NoncacheField />
          {bonusEnabled && (
            <>
              <p className="text-gray-2 text-center mt-2">Сумма бонусами</p>
              <BonusField />
            </>
          )}
        </TabPanel>
        <TabPanel>
          <p className="text-gray-2 text-center">Сумма наличными</p>
          <CacheField />
          <p className="text-gray-2 text-center mt-2">Сумма безналом</p>
          <NoncacheField />
          {bonusEnabled && (
            <>
              <p className="text-gray-2 text-center mt-2">Сумма бонусами</p>
              <BonusField />
            </>
          )}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Payment
