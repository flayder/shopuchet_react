import axios from "~api/axios"
import { toQueryString } from "~utils/."

export type Tokens = {
  "X-Auth-Token": string
  "Refresh-Token": string
}

export type LoginArgs = {
  username: string
  password: string
}

/**
 * @property {string} login - User E-mail.
 * @property {string} password - User password.
 * @property {string} fn - User surname.
 * @property {string} nm - User name.
 * @property {string} ft - User father name.
 * @property {string} phone - Phone number.
 * */
export type RegArgs = {
  login: string
  password: string
  fn: string
  nm: string
  ft: string
  phone: string
}

export type ResetPassArgs = {
  login: string
}

const auth = {
  refreshTokens: (accessToken: string | null, refreshToken: string) =>
    axios.post<Tokens>(`/refresh-tokens?access-token=${accessToken}&refresh-token=${refreshToken}`),

  login: (args: LoginArgs) => axios.get<Tokens>(`/logon-oauth2?${toQueryString(args)}`),

  reg: (args: RegArgs) => axios.post<string>(`/reg?${toQueryString(args)}`),

  resetPass: ({ login }: ResetPassArgs) => axios.get<string>(`/resetpass?login=${login}`)
}

export default auth
