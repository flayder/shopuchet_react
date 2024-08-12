import React from "react"
import NavItem, { NavItemProps } from "~components/sidebar/NavItem"
import { Link } from "react-router-dom"
import useNavbars from "~hooks/redux/useNavbars"
import useAuth from "~hooks/redux/useAuth"
import useTradePoints from "~hooks/redux/useTradePoints"
import Modal from "~components/ui/Modal"

const Sidebar: React.FC = () => {
  const { logout } = useAuth()
  const { toggleSidebar } = useNavbars()
  const closeSidebar = () => toggleSidebar(false)
  const { activeTradePoint } = useTradePoints()

  const [logoutModal, setLogoutModal] = React.useState<boolean>(false)
  const openLogoutModal = () => setLogoutModal(true)
  const closeLogoutModal = () => setLogoutModal(false)

  return (
    <div className={"flex flex-col h-full"}>
      <div className={"flex items-center justify-between px-5 h-15 bg-bg-primary text-bg-white"}>
        <Link to={"/"}>
          <p className={"title-20"}>Shopuchet</p>
        </Link>
        {activeTradePoint && <p className="label-11 text-primary-cloud">{activeTradePoint.name}</p>}
      </div>

      {navItems.map((item, index) => (
        <NavItem key={`nav_item_${index}`} onClick={closeSidebar} {...item} />
      ))}

      <div className={"mt-auto"}>
        <NavItem title={"Профиль"} path={"/dashboard/profile"} onClick={closeSidebar} />
        <NavItem title={"Выход"} path={"#"} onClick={openLogoutModal} />
      </div>

      <Modal open={logoutModal} onClose={closeLogoutModal}>
        <div className="text-center">
          <p className="text-primary-blue text-[24px] font-bold">Вы точно хотите выйти?</p>
          <div className="flex mt-10">
            <button className="btn flex-1 mr-1" onClick={closeLogoutModal}>
              Отмена
            </button>
            <button className="btn danger flex-1 ml-1" onClick={logout}>
              Выйти
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const navItems: NavItemProps[] = [
  {
    title: "Выбрать торговую точку",
    path: "/dashboard/trade-point"
  },
  {
    title: "Главная",
    path: "/dashboard/main"
  },
  {
    title: "Сводный отчет",
    path: "/dashboard/con-report"
  },
  {
    title: "Торговля",
    path: "/dashboard/trade"
  },
  {
    title: "Отчеты",
    path: "/dashboard/reports"
  },
  {
    title: "Товарные остатки",
    path: "/dashboard/remainders"
  },
  {
    title: "Список друзей",
    path: "/dashboard/friends"
  }
]

export default Sidebar
