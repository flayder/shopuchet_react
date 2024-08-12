import React from "react"
import { Icon } from "~types/index"

const Chevron: React.FC<Icon> = ({ className, onClick }) => {
  return (
    <svg
      className={`fill-current ${className}`}
      onClick={onClick}
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.445 9.00047L0.189173 17.1296C-0.0630581 17.3295 -0.0630581 17.6501 0.189173 17.8501C0.441404 18.05 0.845925 18.05 1.09816 17.8501L11.8108 9.35883C12.0631 9.1589 12.0631 8.83827 11.8108 8.63834L1.09816 0.150887C0.97442 0.05281 0.807852 -4.76837e-07 0.646044 -4.76837e-07C0.484235 -4.76837e-07 0.317668 0.0490378 0.193933 0.150887C-0.0582983 0.350814 -0.0582983 0.671451 0.193933 0.871378L10.445 9.00047Z" />
    </svg>
  )
}

export default Chevron
