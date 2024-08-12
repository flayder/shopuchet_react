import React from "react"
import { Link } from "react-router-dom"

import Page from "~components/Page"

const NotFound: React.FC = () => {
  return (
    <Page title="Страница не найдена" className="h-screen flex flex-col items-center justify-center bg-bg-secondary">
      <p className="title-20">404 Страница не найдена</p>
      <Link to={"/"} className="link link-15 mt-2">
        Главная
      </Link>
    </Page>
  )
}

export default NotFound
