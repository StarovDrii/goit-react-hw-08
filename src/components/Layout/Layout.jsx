import { useSelector } from 'react-redux'
import { selectIsRefreshing } from '../../redux/auth/selectors'
import AppBar from '../AppBar/AppBar'
import Loader from '../Loader/Loader'

export default function Layout({ children }) {
  const isRefreshing = useSelector(selectIsRefreshing)

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <AppBar />
      {children}
    </>
  )
}
