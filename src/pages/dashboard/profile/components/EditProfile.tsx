import React from "react"
import { Controller, useForm } from "react-hook-form"
import { EditUserArgs, User } from "~api/routes/user"
import Input from "~elements/Input"
import * as Icon from "~icons/."
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useUser from "~hooks/redux/useUser"

const schema = yup
  .object({
    nm: yup.string().required("Обязательное поле!"),
    fn: yup.string().required("Обязательное поле!"),
    phone: yup.string().required("Обязательное поле!"),
    oldpwd: yup.string(),
    newpwd: yup.string()
  })
  .required()

type Props = {
  onClose(): void
  user: User | null
}

const EditProfile: React.FC<Props> = ({ onClose, user }) => {
  const { control, handleSubmit } = useForm<EditUserArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      nm: user?.nm || "",
      fn: user?.fn || "",
      phone: user?.phone || "",
      oldpwd: "",
      newpwd: ""
    }
  })

  const { editUser, loading } = useUser()

  const onSubmit = (args: EditUserArgs) => editUser(args).then(onClose)

  return (
    <div className="text-center">
      <p className="text-primary-blue text-[24px] font-bold">Редактировать профиль</p>

      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="nm"
          render={({ field, fieldState: { error } }) => {
            return <Input className="mt-5" placeholder="Имя" LeftIcon={Icon.Person} error={error?.message} {...field} />
          }}
        />

        <Controller
          control={control}
          name="fn"
          render={({ field, fieldState: { error } }) => (
            <Input className="mt-5" placeholder="Фамилия" LeftIcon={Icon.Person} error={error?.message} {...field} />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState: { error } }) => (
            <Input className="mt-5" placeholder="Телефон" LeftIcon={Icon.Phone} error={error?.message} {...field} />
          )}
        />

        <Controller
          control={control}
          name="oldpwd"
          render={({ field, fieldState: { error } }) => (
            <Input
              className="mt-5"
              placeholder="Старый пароль"
              type="password"
              LeftIcon={Icon.Lock}
              error={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="newpwd"
          render={({ field, fieldState: { error } }) => (
            <Input
              className="mt-5"
              placeholder="Новый пароль"
              type="password"
              LeftIcon={Icon.Lock}
              error={error?.message}
              {...field}
            />
          )}
        />

        <div className="flex mt-10">
          <button type="button" className="btn flex-1 mr-1" onClick={onClose}>
            Отмена
          </button>
          <button disabled={loading} type="submit" className="btn primary flex-1 ml-1">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
