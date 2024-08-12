import { useMatch } from "react-router-dom"

const useMatchPage = () => {
  const isTradeSale = !!useMatch("/dashboard/trade/sale")

  const isGoBack = isTradeSale

  return { isGoBack }
}

export default useMatchPage
