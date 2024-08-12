import React from "react"
import Page from "~components/Page"
import Input from "~elements/Input"
import { Link } from "react-router-dom"
import Button from "~elements/Button"
import { useForm, Controller } from "react-hook-form"
import { LoginArgs } from "~api/routes/auth"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useAuth from "~hooks/redux/useAuth"
import Preloader from "~components/loaders/Preloader"
import * as Icon from "~icons/."

const schema = yup
  .object({
    username: yup.string().required("Обязательное поле!").email("Неверный e-mail!"),
    password: yup.string().required("Обязательное поле!")
  })
  .required()

const SignIn: React.FC = () => {
  const { login, loading } = useAuth()

  const { control, handleSubmit } = useForm<LoginArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = (args: LoginArgs) => login(args)

  if (loading) return <Preloader />

  return (
    <Page title="Вход" className="full-screen-center px-4">
      <p className="font-medium text-[30px] leading-[53px]">ВХОД</p>
      <form className="mt-10 flex flex-col w-full md:max-w-88" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={"username"}
          render={({ field, fieldState: { error } }) => (
            <Input placeholder="E-mail" type={"email"} error={error?.message} LeftIcon={Icon.Email} {...field} />
          )}
        />
        <Controller
          control={control}
          name={"password"}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="Password"
              type={"password"}
              error={error?.message}
              className="mt-6"
              LeftIcon={Icon.Lock}
              {...field}
            />
          )}
        />
        <Link to="../forgot-password" className="mt-8 link link-15 self-start">
          Забыли пароль?
        </Link>
        <Button type={"submit"} className="primary mt-15">
          ВХОД
        </Button>
        <Link to={"../sign-up"}>
          <Button type={"button"} className="mt-4">
            РЕГИСТРАЦИЯ
          </Button>
        </Link>
      </form>
    </Page>
  )
}

export default SignIn
