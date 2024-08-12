import axios from "~api/axios"
import { toQueryString } from "~utils/."

export type User = {
  fn: string
  nm: string
  ft: string
  phone: string
  login: string
}

export type EditUserArgs = {
  fn: string
  nm: string
  ft: string
  phone: string
  oldpwd?: string
  newpwd?: string
}

const user = {
  getUser: () => axios.get<User>("/api/getuser"),

  editUser: (args: EditUserArgs) => axios.post<string>(`/api/edituser?${toQueryString(args)}`),
  deleteAccount: () => axios.post<string>(`/api/deleteAccount`)
}

export default user
