import React from "react"
import { Controller, useForm } from "react-hook-form"
import { TradePoint } from "~api/routes/tradePoints"
import Button from "~elements/Button"
import Input from "~elements/Input"
import useTradePoints from "~hooks/redux/useTradePoints"
import CheckMark from "~icons/CheckMark"
import Email from "~icons/Email"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useFriends from "~hooks/redux/useFriends"

const schema = yup
  .object({
    email: yup.string().email("Невалидный e-mail!").required("Обязательное поле!")
  })
  .required()

type Props = {
  onClose?(): void
}

type Form = {
  email: string
}

const AddFriend: React.FC<Props> = ({ onClose }) => {
  const { tradePoints } = useTradePoints()
  const [activeTradePoints, setActiveTradePoints] = React.useState<TradePoint[]>([])

  const activateTradePoint = (tradePoint: TradePoint) => () => {
    const tradePoints = [...activeTradePoints]
    const index = tradePoints.findIndex(t => t.gTochkaId === tradePoint.gTochkaId)
    if (index === -1) tradePoints.push(tradePoint)
    else tradePoints.splice(index, 1)
    setActiveTradePoints(tradePoints)
  }

  const isActive = (tradePoint: TradePoint): boolean =>
    !!activeTradePoints.find(tp => tp.gTochkaId === tradePoint.gTochkaId)

  const { control, handleSubmit } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: ""
    }
  })

  const { linkUser } = useFriends()

  const onSubmit = (form: Form) =>
    linkUser(
      form.email.trim().toLowerCase(),
      activeTradePoints.reduce((prev, cur) => prev + `&gtochkaids=${cur.gTochkaId}`, "")
    ).then(onClose)

  return (
    <div>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <Input className="mb-5" placeholder="E-mail" LeftIcon={Email} error={error?.message} {...field} />
        )}
      />
      {tradePoints.map(tp => (
        <div
          onClick={activateTradePoint(tp)}
          key={tp.gTochkaId}
          className="py-3 border-b border-bg-separator flex items-center justify-between transition hover:bg-bg-secondary cursor-pointer"
        >
          <p className="text-gray-2 label-15">{tp.name}</p>
          {isActive(tp) && <CheckMark className="text-primary-blue" />}
        </div>
      ))}
      <div className="flex mt-5">
        {onClose && (
          <Button className="mr-1" onClick={onClose}>
            Отмена
          </Button>
        )}
        <Button className="primary ml-1" onClick={handleSubmit(onSubmit)}>
          ДОБАВИТЬ
        </Button>
      </div>
    </div>
  )
}

export default AddFriend
