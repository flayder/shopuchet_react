import React from "react"
import Page from "~components/Page"
import Spinner from "~elements/Spinner"

const Preloader: React.FC = () => {
  return (
    <Page title="Загрузка..." className="fixed inset-0 flex items-center justify-center bg-bg-secondary !z-2">
      <Spinner />
    </Page>
  )
}

export default Preloader
