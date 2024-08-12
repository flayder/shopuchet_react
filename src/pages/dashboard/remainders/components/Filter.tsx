import React from "react"
import Button from "~elements/Button"
import Input from "~elements/Input"
import Info from "~icons/Info"
import ReactTooltip from "react-tooltip"
import Spinner from "~elements/Spinner"
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useRemainders from "~hooks/redux/useRemainders"
import { SearchRemaindersArgs } from "~redux/slices/remaindersSlice"
import useTradePoints from "~hooks/redux/useTradePoints"

const schema = yup
  .object({
    filter: yup.string(),
    cnt: yup
      .string()
      .test("is_number", "Введите число больше 0!", val =>
        val ? !!val.match(/^\d+$/) || !!val.match(/^\d+\.\d+$/) : !val
      )
  })
  .required()

const Filter: React.FC = () => {
  const { activeTradePoint } = useTradePoints()
  const { loading, searchRemainders } = useRemainders()

  const { control, handleSubmit } = useForm<SearchRemaindersArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      filter: ""
    }
  })

  const onSubmit = (args: SearchRemaindersArgs) => {
    if (activeTradePoint)
      searchRemainders({
        ...args,
        gtochkaid: activeTradePoint.gTochkaId
      })
  }

  return (
    <form className="p-4 lg:shadow-shadow-1 rounded-lg relative" onSubmit={handleSubmit(onSubmit)}>
      {loading && (
        <div className="absolute left-4 top-3">
          <Spinner size={20} />
        </div>
      )}
      <p className="input-18 text-center">Фильтр</p>
      <Controller
        control={control}
        name="cnt"
        render={({ field, fieldState: { error } }) => (
          <Input
            placeholder="Количевство"
            className="mt-4"
            accessoryRight={
              <div data-tip="Показать товары с остатком меньше указанного">
                <Info className="w-5 h-5 cursor-pointer" />
              </div>
            }
            error={error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="filter"
        render={({ field, fieldState: { error } }) => (
          <Input placeholder="Название" className="mt-5" error={error?.message} {...field} />
        )}
      />

      <Button type="submit" className="primary mt-6" disabled={loading}>
        ПОИСК
      </Button>
      <ReactTooltip place="left" type="dark" effect="solid" />
    </form>
  )
}

export default Filter
