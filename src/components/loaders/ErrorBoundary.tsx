import React from "react"
import Error from "./Error"

type Props = {
  children: React.ReactNode
}
type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(e: Error, info: React.ErrorInfo) {
    console.error(e, info)
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }

    return this.props.children
  }
}

export default ErrorBoundary
