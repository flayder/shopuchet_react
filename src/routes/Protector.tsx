import React from "react"
import { Navigate, useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
  protect: boolean
  redirectURL: string
}

const Protector: React.FC<Props> = props => {
  const { children, protect, redirectURL } = props

  const location = useLocation()

  if (protect) return <Navigate to={redirectURL} state={{ from: location }} replace />
  return <>{children}</>
}

export default Protector
