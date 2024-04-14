import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'
import clsx from 'clsx'
import css from './Navigation.module.css'

const currentPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.isCurrent)
}
export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <nav className={css.nav}>
      <NavLink className={currentPage} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={currentPage} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  )
}
