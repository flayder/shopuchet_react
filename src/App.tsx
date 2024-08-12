import React from "react"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "~components/loaders/ErrorBoundary"
import { Provider as ReduxProvider } from "react-redux"
import store, { persistor } from "~redux/store"
import { PersistGate } from "redux-persist/integration/react"
import Preloader from "~components/loaders/Preloader"
import { BrowserRouter } from "react-router-dom"
import Routes from "~routes/Routes"
import { Toaster } from "react-hot-toast"
import "react-datepicker/dist/react-datepicker.css"
import { setDefaultLocale, registerLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"
registerLocale("ru", ru)
setDefaultLocale("ru")

const App: React.FC = () => {
  return (
    <div className="App">
      <HelmetProvider>
        <ErrorBoundary>
          <ReduxProvider store={store}>
            <PersistGate loading={<Preloader />} persistor={persistor}>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </PersistGate>
          </ReduxProvider>
        </ErrorBoundary>
      </HelmetProvider>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
