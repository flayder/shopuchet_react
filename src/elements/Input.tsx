import React from "react"
import { Icon } from "~types/index"
import cls from "classnames"

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string
  LeftIcon?: React.ElementType<Icon>
  accessoryRight?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, error, LeftIcon, accessoryRight, ...restProps }, ref) => {
    return (
      <div className={`relative ${className}`}>
        {LeftIcon && <LeftIcon className="absolute inset-y-0 my-auto left-3 w-5 h-5" />}
        <input
          ref={ref}
          className={cls("input-field w-full", {
            error,
            "pl-10": LeftIcon
          })}
          {...restProps}
        />
        {accessoryRight && (
          <div className="absolute inset-y-0 my-auto right-3 flex items-center justify-center">{accessoryRight}</div>
        )}
        {error && <p className="tapbar-11 text-move-spending absolute top-full">{error}</p>}
      </div>
    )
  }
)

export default Input
