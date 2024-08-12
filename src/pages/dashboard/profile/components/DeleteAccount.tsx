import React from "react"
import useUser from "~hooks/redux/useUser"

type Props = {
  onClose(): void
}

const DeleteAccount: React.FC<Props> = ({ onClose }) => {
  const { deleteAccount } = useUser()

  return (
    <div className="text-center">
      <p className="text-primary-blue text-[24px] font-bold">Вы точно хотите удалить аккаунт?</p>
      <div className="flex mt-10">
        <button className="btn flex-1 mr-1" onClick={onClose}>
          Отмена
        </button>
        <button className="btn danger flex-1 ml-1" onClick={deleteAccount}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount
