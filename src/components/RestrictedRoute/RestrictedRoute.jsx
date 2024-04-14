import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLogeIn = useSelector(selectIsLoggedIn)

  return isLogeIn ? <Navigate to={redirectTo} /> : Component
}

export default RestrictedRoute
