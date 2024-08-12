import React from "react"
import Page from "~components/Page"
import Modal from "~components/ui/Modal"
import Button from "~elements/Button"
import useNavbars from "~hooks/redux/useNavbars"
import useUser from "~hooks/redux/useUser"
import useBreakpoints from "~hooks/useBreakpoints"
import * as Icon from "~icons/."
import DeleteAccount from "./components/DeleteAccount"
import EditProfile from "./components/EditProfile"

const Profile: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Профиль"
  })

  const { user } = useUser()

  const [editModal, setEditModal] = React.useState<boolean>(false)
  const toggleEditModal = (open: boolean) => () => setEditModal(open)

  const [deleteAccModal, setDeleteAccModal] = React.useState<boolean>(false)
  const toggleDeleteAccModal = (open: boolean) => () => setDeleteAccModal(open)

  return (
    <Page title={headerTitle} className="px-4">
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}
      <div className="py-4 flex items-center sm:items-end justify-between border-b border-bg-separator border-dashed">
        <p className="text-primary-blue volume-17">Личные данные</p>
        {isMobile ? (
          <div className="p-1 cursor-pointer text-primary-blue active:text-bg-primary" onClick={toggleEditModal(true)}>
            <Icon.Edit />
          </div>
        ) : (
          <div className="flex items-center">
            <Button className="w-auto mr-2" onClick={toggleEditModal(true)}>
              Редактировать
            </Button>
            <Button className="danger w-auto" onClick={toggleDeleteAccModal(true)}>
              Удалить аккаунт
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:mt-5">
        <div className="py-4 border-b border-bg-separator border-dashed sm:px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon.Person className="w-5 h-5" />
              <p className="ml-2 text-gray-2">Имя:</p>
            </div>
            <p className="volume-17 text-primary-blue">{user?.nm || "Не указано"}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Icon.Person className="w-5 h-5" />
              <p className="ml-2 text-gray-2">Фамилия:</p>
            </div>
            <p className="volume-17 text-primary-blue">{user?.fn || "Не указано"}</p>
          </div>
        </div>

        <div className="py-4 border-b border-bg-separator border-dashed sm:px-2 sm:border-l md:border-r">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon.Email className="w-5 h-5" />
              <p className="ml-2 text-gray-2">E-mail:</p>
            </div>
            <p className="volume-17 text-primary-blue">{user?.login || "Не указано"}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Icon.Phone className="w-5 h-5" />
              <p className="ml-2 text-gray-2">Телефон:</p>
            </div>
            <p className="volume-17 text-primary-blue">{user?.phone || "Не указано"}</p>
          </div>
        </div>

        <div className="py-4 border-b border-bg-separator border-dashed sm:col-span-2 md:col-span-1 sm:px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon.Lock className="w-5 h-5" />
              <p className="ml-2 text-gray-2">Пароль:</p>
            </div>
            <p className="volume-17 text-primary-blue">********</p>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="mt-4">
          <Button className="danger" onClick={toggleDeleteAccModal(true)}>
            Удалить аккаунт
          </Button>
        </div>
      )}

      <Modal open={editModal} onClose={toggleEditModal(false)}>
        <EditProfile onClose={toggleEditModal(false)} user={user} />
      </Modal>
      <Modal open={deleteAccModal} onClose={toggleDeleteAccModal(false)}>
        <DeleteAccount onClose={toggleDeleteAccModal(false)} />
      </Modal>
    </Page>
  )
}

export default Profile
