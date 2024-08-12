import React from "react"
import useBreakpoints from "~hooks/useBreakpoints"
import { initialState, setHeaderTitleAction, toggleSidebarAction } from "~redux/slices/navbarsSlice"
import { useAppDispatch, useAppSelector } from "."

type Props = {
  headerTitle: string
}

const useNavbars = (props?: Props) => {
  const { isMobile } = useBreakpoints()
  const dispatch = useAppDispatch()
  const { sidebarOpen, headerTitle, headerSubtitle } = useAppSelector(state => state.navbars)

  const toggleSidebar = (open: boolean) => dispatch(toggleSidebarAction(open))

  React.useEffect(() => {
    if (props) dispatch(setHeaderTitleAction(props.headerTitle))
    else dispatch(setHeaderTitleAction(initialState.headerTitle))
  }, [props, isMobile])

  return { sidebarOpen, headerTitle, headerSubtitle, toggleSidebar }
}

export default useNavbars
