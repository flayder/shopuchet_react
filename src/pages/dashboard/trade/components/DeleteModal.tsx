import React from "react"
import Button from "~elements/Button"

type Props = {
  onClose(): void
  deleteId: number | null
  onDelete(deleteId: number | null): void
  label: string
}

const DeleteModal: React.FC<Props> = ({ onClose, onDelete, deleteId, label }) => {
  const handelDelete = () => {
    onDelete(deleteId)
    onClose()
  }

  return (
    <div>
      <p className="volume-22 text-center text-primary-blue">Вы точно хотите удалить {label}?!</p>
      <div className="mt-10 sm:flex sm:flex-row-reverse">
        <Button className="uppercase danger sm:ml-1" onClick={handelDelete}>
          Удалить
        </Button>
        <Button className="uppercase mt-4 sm:mt-0 sm:mr-1" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal
