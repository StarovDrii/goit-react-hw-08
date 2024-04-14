import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contacts/operations'
import { toast } from 'react-hot-toast'
import css from './Contact.module.css'

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch()
  const handleDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then((value) => {
        toast.success(`Deleted ${value.name}`, {
          position: 'top-right',
        })
      })
  }
  return (
    <>
      <h2 className={css.name}>{name}</h2>
      <p className={css.number}>{number}</p>
      <button className={css.btn} onClick={handleDeleteContact}>
        Delete
      </button>
    </>
  )
}
