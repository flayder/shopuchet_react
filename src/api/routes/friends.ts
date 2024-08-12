import axios from "~api/axios"

export type Friend = {
  usersId: number
  login: string
  gTochkaId: number
  nameGTochka: string
}

const friends = {
  getFriends: () => axios.get<Friend[]>("/api/readusers"),

  linkUser: (login: string, gtochkaids: string) => axios.post<string>(`/api/linkuser?login=${login}${gtochkaids}`)
}

export default friends
