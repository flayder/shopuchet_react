import React from "react"
import { Icon } from "~types/index"

const Menu: React.FC<Icon> = ({ className, onClick }) => {
  return (
    <svg
      className={`fill-current ${className}`}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z" />
    </svg>
  )
}

export default Menu
