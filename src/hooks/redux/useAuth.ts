import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { LoginArgs, RegArgs, ResetPassArgs } from "~api/routes/auth"
import { clearErrorAction, loginAction, logoutAction, regAction, resetPassAction } from "~redux/slices/authSlice"
import { useAppDispatch, useAppSelector } from "."
import { persistor } from "~redux/store"
import React from "react"

const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(state => state.auth)

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const login = (args: LoginArgs) => {
    dispatch(loginAction(args))
      .unwrap()
      .then(() => {
        navigate("/")
      })
  }

  const reg = (args: RegArgs) => {
    dispatch(regAction(args))
      .unwrap()
      .then(mes => {
        toast.success(mes)
        navigate("/")
      })
  }

  const resetPass = async (args: ResetPassArgs) => {
    return await dispatch(resetPassAction(args)).unwrap()
  }

  const logout = () => {
    persistor.purge()
    dispatch(logoutAction())
    persistor.flush()
  }

  return { login, logout, reg, resetPass, loading }
}

export default useAuth
