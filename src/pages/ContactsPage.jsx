import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectError,
  selectLoading,
} from '../redux/contacts/selectors'
import { fetchContacts } from '../redux/contacts/operations'
import ContactForm from '../components/ContactForm/ContactForm'
import SearchBar from '../components/SearchBox/SearchBox'
import ContactList from '../components/ContactList/ContactList'
import Loader from '../components/Loader/Loader'
import ErrorMasege from '../components/ErrorMessage/ErrorMessage'

export default function ContactsPage() {
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <>
      <h1>Phonebook</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          width: 'fit-content',
        }}
      >
        <ContactForm />
        <SearchBar />
      </div>
      {loading && !error && <Loader />}
      {error && <ErrorMasege />}
      <ContactList />
    </>
  )
}
