import React from "react"
import { Navigate, Outlet, Route, Routes as RouterRoutes } from "react-router-dom"
import * as Pages from "~pages/."
import Protector from "~routes/Protector"
import useUser from "~hooks/redux/useUser"
import Preloader from "~components/loaders/Preloader"
import AppOverlay from "~overlays/AppOverlay"
import InfoOverlay from "~overlays/InfoOverlay"
import useTradePoints from "~hooks/redux/useTradePoints"

const Routes: React.FC = () => {
  const { loading, isLoggedIn } = useUser("cache-first")
  const { getTradePoints } = useTradePoints()

  React.useEffect(() => {
    if (isLoggedIn) getTradePoints()
  }, [isLoggedIn])

  if (loading) return <Preloader />

  return (
    <RouterRoutes>
      <Route
        path="/"
        element={
          <Protector protect={!isLoggedIn} redirectURL={"/auth/sign-in"}>
            <AppOverlay />
          </Protector>
        }
      >
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<InfoOverlay />}>
          <Route index element={<Navigate to="main" />} />
          <Route path="trade-point" element={<Pages.TradePoint />} />
          <Route path="main" element={<Pages.Main />} />
          <Route path="con-report" element={<Pages.ConReport />} />
          <Route path="trade">
            <Route index element={<Pages.Trade />} />
            <Route path="sale" element={<Pages.Sale />} />
            <Route path="income" element={<Pages.Income />} />
            <Route path="return" element={<Pages.Return />} />
          </Route>
          <Route path="reports" element={<Pages.Reports />} />
          <Route path="remainders" element={<Pages.Remainders />} />
          <Route path="friends" element={<Pages.Friends />} />
          <Route path="profile" element={<Pages.Profile />} />
        </Route>
      </Route>

      <Route
        path="auth"
        element={
          <Protector protect={isLoggedIn} redirectURL="/">
            <Outlet />
          </Protector>
        }
      >
        <Route index element={<Navigate to={"sign-in"} />} />
        <Route path="sign-in" element={<Pages.SignIn />} />
        <Route path="sign-up" element={<Pages.SignUp />} />
        <Route path="forgot-password" element={<Pages.ResetPassword />} />
      </Route>

      <Route path="*" element={<Pages.NotFound />} />
    </RouterRoutes>
  )
}

export default Routes
