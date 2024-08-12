import React from "react"
import Page from "~components/Page"
import { Controller, useForm } from "react-hook-form"
import Input from "~elements/Input"
import { Link } from "react-router-dom"
import Button from "~elements/Button"
import { RegArgs } from "~api/routes/auth"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useAuth from "~hooks/redux/useAuth"
import Preloader from "~components/loaders/Preloader"
import * as Icon from "~icons/."

const schema = yup
  .object({
    nm: yup.string().required("Обязательное поле!"),
    fn: yup.string().required("Обязательное поле!"),
    login: yup.string().required("Обязательное поле!").email("Неверный e-mail!"),
    phone: yup.string().required("Обязательное поле!"),
    password: yup.string().required("Обязательное поле!")
  })
  .required()

const SignUp: React.FC = () => {
  const { reg, loading } = useAuth()

  const { control, handleSubmit } = useForm<RegArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      nm: "",
      fn: "",
      login: "",
      phone: "",
      password: ""
    }
  })

  const onSubmit = (args: RegArgs) => reg(args)

  if (loading) return <Preloader />

  return (
    <Page title="Регистрация" className="full-screen-center px-4">
      <p className="font-medium text-[30px] leading-[53px]">РЕГИСТРАЦИЯ</p>
      <form className="mt-10 flex flex-col w-full md:max-w-88" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={"nm"}
          render={({ field, fieldState: { error } }) => (
            <Input placeholder="Имя" error={error?.message} LeftIcon={Icon.Person} {...field} />
          )}
        />
        <Controller
          control={control}
          name={"fn"}
          render={({ field, fieldState: { error } }) => (
            <Input placeholder="Фамилия" error={error?.message} className="mt-6" LeftIcon={Icon.Person} {...field} />
          )}
        />
        <Controller
          control={control}
          name={"login"}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="E-mail"
              type={"email"}
              error={error?.message}
              className="mt-6"
              LeftIcon={Icon.Email}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name={"phone"}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="Телефон"
              type={"tel"}
              error={error?.message}
              className="mt-6"
              LeftIcon={Icon.Phone}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="Пароль"
              type={"password"}
              error={error?.message}
              className="mt-6"
              LeftIcon={Icon.Lock}
              {...field}
            />
          )}
        />

        <Button type={"submit"} className="primary mt-15">
          РЕГИСТРАЦИЯ
        </Button>
        <Link to={"../sign-in"}>
          <Button type={"button"} className="mt-4">
            ВХОД
          </Button>
        </Link>
      </form>
    </Page>
  )
}

export default SignUp
