import React from "react"

enum Breakpoints {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  "2XL" = 1536
}

type BreakpointsToRender = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const useBreakpoints = (): BreakpointsToRender => {
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth)

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    isMobile: windowWidth < Breakpoints.SM,
    isTablet: windowWidth > Breakpoints.SM && windowWidth < Breakpoints.LG,
    isDesktop: windowWidth > Breakpoints.LG
  }
}

export default useBreakpoints
