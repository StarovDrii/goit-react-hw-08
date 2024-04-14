import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'
import css from './UserMenu.module.css'

export default function UserMenu() {
  const dispatch = useDispatch()
  const { name } = useSelector(selectUser)

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div className={css.wrap}>
      <p>Welcome, {name || 'User'}</p>
      <button className={css.btn} onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}
