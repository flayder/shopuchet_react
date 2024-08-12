import React from "react"
import Menu from "~icons/Menu"
import useNavbars from "~hooks/redux/useNavbars"
import useTradePoints from "~hooks/redux/useTradePoints"
import useMatchPage from "~hooks/useMatchPage"
import Chevron from "~icons/Chevron"
import { useNavigate } from "react-router-dom"

const Header: React.FC = () => {
  const { toggleSidebar, headerTitle } = useNavbars()
  const openSidebar = () => toggleSidebar(true)
  const { activeTradePoint } = useTradePoints()
  const { isGoBack } = useMatchPage()
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <div className={"h-15 bg-bg-primary flex items-center px-5 text-bg-white z-10"}>
      {isGoBack ? (
        <Chevron onClick={goBack} className="transform rotate-180 mr-4 cursor-pointer" />
      ) : (
        <Menu onClick={openSidebar} className={"mr-4 cursor-pointer"} />
      )}
      <div>
        <p className={"title-20"}>{headerTitle}</p>
        {activeTradePoint && <p className="label-11 text-primary-cloud">{activeTradePoint.name}</p>}
      </div>
    </div>
  )
}

export default Header
