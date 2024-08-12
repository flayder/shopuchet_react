import React from "react"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: React.FC<Props> = ({ children, className, ...restProps }) => {
  return (
    <button className={`btn button-16 w-full ${className}`} {...restProps}>
      {children}
    </button>
  )
}

export default Button
