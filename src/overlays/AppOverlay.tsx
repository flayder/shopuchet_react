import React from "react"
import Sidebar from "react-sidebar"
import { Outlet } from "react-router-dom"
import useBreakpoints from "~hooks/useBreakpoints"
import useNavbars from "~hooks/redux/useNavbars"
import AppSidebar from "~components/sidebar"
import Header from "~components/ui/Header"

const AppOverlay: React.FC = () => {
  const { isDesktop, isMobile } = useBreakpoints()
  const { sidebarOpen, toggleSidebar } = useNavbars()

  return (
    <Sidebar
      sidebar={<AppSidebar />}
      sidebarClassName={"w-[80%] sm:w-80 lg:w-70 z-20 bg-bg-white"}
      open={sidebarOpen}
      docked={isDesktop}
      transitions={!isDesktop}
      onSetOpen={toggleSidebar}
    >
      {isMobile && <Header />}
      <Outlet />
    </Sidebar>
  )
}

export default AppOverlay
