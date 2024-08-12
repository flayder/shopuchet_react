import React from "react"
import Page from "~components/Page"
import Button from "~elements/Button"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import cls from "classnames"
import { isEven } from "~utils/index"
import useFriends from "~hooks/redux/useFriends"
import Modal from "~components/ui/Modal"
import AddFriend from "./components/AddFriend"

const Friends: React.FC = () => {
  const { isMobile } = useBreakpoints()
  const { headerTitle } = useNavbars({
    headerTitle: "Список друзей"
  })

  const { getFriends, friends } = useFriends()

  React.useEffect(() => {
    getFriends()
  }, [])

  const [addModal, setAddModal] = React.useState<boolean>(false)
  const toggleAddModal = (open: boolean) => () => setAddModal(open)

  return (
    <Page title={headerTitle}>
      {!isMobile && <p className={"title-20"}>{headerTitle}</p>}
      {isMobile && (
        <div className="mx-4 py-4 border-b border-bg-separator border-dashed">
          <Button className="primary" onClick={toggleAddModal(true)}>
            ДОБАВИТЬ
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="py-4 lg:col-span-2">
          {friends.map((friend, i) => (
            <div
              key={`friend_${i}`}
              className={cls("px-4 py-2", {
                "bg-bg-secondary": isEven(i)
              })}
            >
              <p className="truncate label-15 text-gray-2">{friend.login}</p>
              <p className="truncate label-13 text-gray-2">{friend.nameGTochka.join(", ")}</p>
            </div>
          ))}
        </div>
        {!isMobile && (
          <div className="p-5 shadow-shadow-2">
            <AddFriend />
          </div>
        )}
      </div>

      <Modal open={addModal} onClose={toggleAddModal(false)}>
        <AddFriend onClose={toggleAddModal(false)} />
      </Modal>
    </Page>
  )
}

export default Friends
