import React from "react"
import { Icon } from "~types/index"

const MoreVertical: React.FC<Icon> = ({ className, onClick }) => {
  return (
    <svg
      className={`fill-current ${className}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g data-name="Layer 2">
        <g data-name="more-vertical">
          <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="19" r="2" />
        </g>
      </g>
    </svg>
  )
}

export default MoreVertical
