import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface NavbarsState {
  sidebarOpen: boolean
  headerTitle: string
  headerSubtitle?: string
}

export const initialState: NavbarsState = {
  sidebarOpen: false,
  headerTitle: "Shopuchet"
}

const navbarsSlice = createSlice({
  name: "navbars",
  initialState,
  reducers: {
    toggleSidebarAction: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setHeaderTitleAction: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload
    },
    setHeaderSubtitleAction: (state, action?: PayloadAction<string>) => {
      state.headerSubtitle = action?.payload
    }
  }
})

export const { toggleSidebarAction, setHeaderTitleAction, setHeaderSubtitleAction } = navbarsSlice.actions
export default navbarsSlice.reducer
