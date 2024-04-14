import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredContacts } from '../../redux/contacts/selectors'
import { fetchContacts } from '../../redux/contacts/operations'
import Contact from '../Contact/Contact'
import css from './ContactList.module.css'

export default function ContactList() {
  const dispatch = useDispatch()
  const contacts = useSelector(selectFilteredContacts)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  if (contacts)
    return (
      <ul className={css.list}>
        {contacts.map((contact) => (
          <li className={css.item} key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          </li>
        ))}
      </ul>
    )
}
