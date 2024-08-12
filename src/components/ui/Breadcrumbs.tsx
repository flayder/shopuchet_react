import React from "react"
import { Link, useLocation } from "react-router-dom"
import cls from "classnames"
import { getTranslate } from "~utils/."
import Chevron from "~icons/Chevron"
import Menu from "~icons/Menu"
import useBreakpoints from "~hooks/useBreakpoints"
import useNavbars from "~hooks/redux/useNavbars"

const Breadcrumbs: React.FC = () => {
  const { isTablet } = useBreakpoints()
  const { headerTitle, toggleSidebar } = useNavbars()

  const openSidebar = () => toggleSidebar(true)

  const { pathname } = useLocation()
  const paths = pathname.split("/").slice(1)

  return (
    <div className={"bg-bg-primary w-full h-full text-bg-white flex items-center px-6"}>
      {paths.map(getTranslate).map((path, index) => (
        <div key={`breadcrumb_${index}`} className="flex items-center">
          <Link
            to={`/${paths.slice(0, index + 1).join("/")}`}
            className={cls("underline volume-17", {
              "text-text-disable pointer-events-none": index == paths.length - 1
            })}
          >
            {index == paths.length - 1 ? headerTitle : path}
          </Link>
          {index !== paths.length - 1 && <Chevron className="mx-2 w-3 h-3" />}
        </div>
      ))}
      {isTablet && <Menu onClick={openSidebar} className={"ml-auto cursor-pointer"} />}
    </div>
  )
}

export default Breadcrumbs
