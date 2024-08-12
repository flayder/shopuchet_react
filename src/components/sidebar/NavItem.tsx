import React from "react"
import CheckMark from "~icons/CheckMark"
import { Link, useMatch } from "react-router-dom"
import cls from "classnames"

export type NavItemProps = {
  title: string
  path: string
  onClick?(): void
}

const NavItem: React.FC<NavItemProps> = ({ title, path, onClick }) => {
  const active = !!useMatch(path)

  return (
    <Link
      onClick={onClick}
      to={path}
      className={cls(
        "transition px-5 h-15 border-b border-bg-separator hover:bg-bg-secondary items-center flex justify-between",
        {
          "text-primary-blue": active
        }
      )}
    >
      <p className={"dropdown-16"}>{title}</p>
      {active && <CheckMark />}
    </Link>
  )
}

export default NavItem
