import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../redux/contactsOps'
import { selectError, selectLoading } from '../../redux/contactsSlice'
import { Toaster } from 'react-hot-toast'
import ContactList from '../ContactList/ContactList'
import SearchBar from '../SearchBox/SearchBox'
import ContactForm from '../ContactForm/ContactForm'
import Loader from '../Loader/Loader'
import ErrorMasege from '../ErrorMessage/ErrorMessage'
import './App.css'

export default function App() {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <div className="container">
      <h1>Phonebook</h1>
      {error && <ErrorMasege />}
      {loading && <Loader />}
      {!error && (
        <>
          <ContactForm />
          <SearchBar />
          <ContactList />
          <Toaster />
        </>
      )}
    </div>
  )
}
