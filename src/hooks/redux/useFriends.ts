import React from "react"
import toast from "react-hot-toast"
import { clearErrorAction, getFriendsAction, linkUserAction } from "~redux/slices/friendsSlice"
import { useAppDispatch, useAppSelector } from "."

const useFriends = () => {
  const { loading, error, friends } = useAppSelector(state => state.friends)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (error) {
      toast.error(JSON.stringify(error.response?.data))
      dispatch(clearErrorAction())
    }
  }, [error])

  const getFriends = () => dispatch(getFriendsAction())

  const linkUser = (login: string, gtochkaids: string) =>
    dispatch(linkUserAction({ login, gtochkaids }))
      .unwrap()
      .then(message => {
        toast.success(message)
        dispatch(getFriendsAction())
      })

  return { loading, friends, getFriends, linkUser }
}

export default useFriends
