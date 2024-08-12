import React from "react"
import { MoonLoader } from "react-spinners"

type Props = {
  size?: number
  className?: string
  color?: string
}

const Spinner: React.FC<Props> = ({ size, className, color = "#404CB3" }) => {
  return <MoonLoader color={color} size={size} className={className} />
}

export default Spinner
