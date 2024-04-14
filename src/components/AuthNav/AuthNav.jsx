import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import css from '../UserMenu/UserMenu.module.css'

const currentPage = ({ isActive }) => {
  return clsx(css.link, isActive && css.isCurrent)
}

export default function AuthNav() {
  return (
    <ul className={css.wrap}>
      <li>
        <NavLink className={currentPage} to="/register">
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink className={currentPage} to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  )
}
