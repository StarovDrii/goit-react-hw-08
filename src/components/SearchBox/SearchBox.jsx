import { useDispatch, useSelector } from 'react-redux'
import { useId } from 'react'
import { changeFilter } from '../../redux/filters/slice'
import { selectNameFilter } from '../../redux/filters/selectors'
import css from './SearchBox.module.css'

export default function SearchBar() {
  const dispatch = useDispatch()
  const uniqueId = useId()

  const filter = useSelector(selectNameFilter)
  return (
    <div className={css.wrap}>
      <label className={css.label} htmlFor={uniqueId}>
        Find contacts by name
      </label>
      <input
        className={css.input}
        id={uniqueId}
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  )
}
