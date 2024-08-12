import React from "react"

const DateIcon: React.FC = () => {
  return (
    <div className="border-2 rounded-lg border-current w-6 h-6 flex items-center justify-center">
      <p className="label-dropdown-14">{new Date().getDate()}</p>
    </div>
  )
}

export default DateIcon
