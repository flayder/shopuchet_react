import React from "react"
import { Icon } from "~types/index"

const CheckMark: React.FC<Icon> = ({ className, onClick }) => {
  return (
    <svg
      className={`stroke-current ${className}`}
      onClick={onClick}
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 7.14286L6.5 11L15 2" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default CheckMark
