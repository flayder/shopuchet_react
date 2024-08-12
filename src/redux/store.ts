import { configureStore, combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

import navbarsSlice from "~redux/slices/navbarsSlice"
import authSlice from "~redux/slices/authSlice"
import userSlice from "~redux/slices/userSlice"
import tradePointsSlice from "./slices/tradePointsSlice"
import mainSlice from "./slices/mainSlice"
import friendsSlice from "./slices/friendsSlice"
import conReportSlice from "./slices/conReportSlice"
import remaindersSlice from "./slices/remaindersSlice"
import reportsSlice from "./slices/reportsSlice"
import tradeSlice from "./slices/tradeSlice"

const reducer = combineReducers({
  navbars: navbarsSlice,
  auth: authSlice,
  user: userSlice,
  tradePoints: tradePointsSlice,
  main: mainSlice,
  friends: friendsSlice,
  conReport: conReportSlice,
  remainders: remaindersSlice,
  reports: reportsSlice,
  trade: tradeSlice
})

type State = ReturnType<typeof reducer>

const rootReducer: Reducer<State> = (state, action) => {
  if (action.type === "auth/logoutAction") {
    state = {} as State
  }
  return reducer(state, action)
}

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["main", "remainders", "reports", "trade", "navbars", "tradePoints"]
}

const pReducer = persistReducer<State, AnyAction>(persistConfig, rootReducer)

const store = configureStore({
  reducer: pReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export default store
