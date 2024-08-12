import React from "react"
import { Icon } from "~types/index"

const Clock: React.FC<Icon> = ({ className, onClick }) => {
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
      <g clipPath="url(#clip0_2136_1346)">
        <path d="M12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0ZM12 21.6C6.7068 21.6 2.4 17.2932 2.4 12C2.4 6.7068 6.7068 2.4 12 2.4C17.2932 2.4 21.6 6.7068 21.6 12C21.6 17.2932 17.2932 21.6 12 21.6Z" />
        <path d="M13 7H11V13H17V11H13V7Z" />
      </g>
      <defs>
        <clipPath id="clip0_2136_1346">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Clock
