import { Formik, Form, Field, ErrorMessage } from 'formik'
import validationSchema from '../../tools/validationSchema'
import { useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from '../../redux/contactsOps'
import { selectItems } from '../../redux/contactsSlice'
import { toast } from 'react-hot-toast'
import css from './ContactForm.module.css'

export default function ContactForm() {
  const uniqueId = useId()
  const dispatch = useDispatch()
  const contacts = useSelector(selectItems)

  function handleAddContact(values, actions) {
    dispatch(addContact({ ...values }))
      .unwrap()
      .then((value) => {
        toast.success(`Added ${value.name}`, {
          position: 'top-right',
        })
      })
    actions.resetForm()
  }
  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        number: '',
      }}
      validationSchema={validationSchema(contacts)}
      onSubmit={handleAddContact}
    >
      <Form className={css.form}>
        <div>
          <label className={css.label} htmlFor={uniqueId}>
            Name
          </label>
          <Field
            className={css.input}
            name="name"
            id={uniqueId}
          ></Field>
          <ErrorMessage
            name="name"
            component="span"
            className={css.error}
          />
        </div>
        <div>
          <label className={css.label} htmlFor={uniqueId}>
            Number
          </label>
          <Field
            className={css.input}
            name="number"
            id={uniqueId}
          ></Field>
          <ErrorMessage
            name="number"
            component="span"
            className={css.error}
          />
        </div>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  )
}
