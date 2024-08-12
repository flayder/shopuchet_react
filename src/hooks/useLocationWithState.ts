import { useLocation, Location } from "react-router-dom"

interface LocationWithState<T> extends Location {
  state: T | null
}

const useLocationWithState = <T = {}>() => {
  return useLocation() as LocationWithState<T>
}

export default useLocationWithState
