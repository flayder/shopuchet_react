import React from "react"
import Page from "~components/Page"
import { Controller, useForm } from "react-hook-form"
import Input from "~elements/Input"
import { Link } from "react-router-dom"
import Button from "~elements/Button"
import { ResetPassArgs } from "~api/routes/auth"
import useAuth from "~hooks/redux/useAuth"
import Preloader from "~components/loaders/Preloader"
import Email from "~icons/Email"

const ResetPassword: React.FC = () => {
  const { resetPass, loading } = useAuth()
  const [message, setMessage] = React.useState<string>("")

  const { control, handleSubmit } = useForm<ResetPassArgs>({
    defaultValues: {
      login: ""
    }
  })

  const onSubmit = (args: ResetPassArgs) => resetPass(args).then(setMessage)

  if (loading) return <Preloader />

  return (
    <Page title="Восстановить пароль" className="full-screen-center px-4">
      <p className="font-medium text-[30px] leading-[53px] text-center">ВОССТАНОВИТЬ ПАРОЛЬ</p>
      <form className="mt-10 flex flex-col w-full md:max-w-88" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={"login"}
          render={({ field, fieldState: { error } }) => (
            <Input placeholder="E-mail" type={"email"} error={error?.message} LeftIcon={Email} {...field} />
          )}
        />
        {message && (
          <p className={"mt-4 text-center label-15 text-move-income"}>
            Сообщение с временным паролем было отправлено на ваш e-mail!
          </p>
        )}
        <Button type={"submit"} className="primary mt-15">
          ВОССТАНОВИТЬ
        </Button>
        <Link to={"../sign-in"}>
          <Button type={"button"} className="mt-4">
            НАЗАД
          </Button>
        </Link>
      </form>
    </Page>
  )
}

export default ResetPassword
