import React from "react"
import { Outlet } from "react-router-dom"
import Breadcrumbs from "~components/ui/Breadcrumbs"
import useBreakpoints from "~hooks/useBreakpoints"

const InfoOverlay: React.FC = () => {
  const { isMobile } = useBreakpoints()

  return (
    <>
      {!isMobile && (
        <div className="h-15 relative bg-transparent">
          <Breadcrumbs />
        </div>
      )}
      <Outlet />
    </>
  )
}

export default InfoOverlay
