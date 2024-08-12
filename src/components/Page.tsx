import React from "react"
import { Helmet } from "react-helmet-async"

type Props = {
  title: string
  children?: React.ReactNode
  className?: string
}

const Page: React.FC<Props> = ({ title, children, className }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Shopuchet</title>
      </Helmet>
      <div className={`px-0 sm:px-6 lg:px-10 py-0 sm:py-5 lg:py-6 ${className}`}>{children}</div>
    </>
  )
}

export default Page
