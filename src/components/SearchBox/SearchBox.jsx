import { useDispatch, useSelector } from 'react-redux'
import {
  changeFilter,
  selectNameFilter,
} from '../../redux/filtersSlice'
import css from './SearchBox.module.css'

export default function SearchBar() {
  const dispatch = useDispatch()

  const filter = useSelector(selectNameFilter)
  return (
    <div className={css.wrap}>
      <label className={css.label} htmlFor="searchbar">
        Find contacts by name
      </label>
      <input
        className={css.input}
        id="searchbar"
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  )
}
