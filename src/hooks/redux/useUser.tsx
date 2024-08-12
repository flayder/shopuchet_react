import React from "react"
import toast from "react-hot-toast"
import { EditUserArgs } from "~api/routes/user"
import { logoutAction } from "~redux/slices/authSlice"
import { deleteAccountAction, editUserAction, getUserAction } from "~redux/slices/userSlice"
import { useAppDispatch, useAppSelector } from "."

type FetchType = "cache-only" | "cache-first"

const useUser = (fetchType: FetchType = "cache-only") => {
  const dispatch = useAppDispatch()
  const { user, loading, error } = useAppSelector(state => state.user)

  React.useEffect(() => {
    if (fetchType === "cache-first") dispatch(getUserAction())
  }, [fetchType])

  const deleteAccount = () =>
    dispatch(deleteAccountAction())
      .unwrap()
      .then(message => {
        toast.success(message)
        dispatch(logoutAction())
      })

  const editUser = (args: EditUserArgs) =>
    dispatch(editUserAction(args))
      .unwrap()
      .then(message => {
        toast.success(message)
        dispatch(getUserAction())
      })

  return { user, loading, error, isLoggedIn: !!user, deleteAccount, editUser }
}

export default useUser
