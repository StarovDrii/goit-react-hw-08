import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactsValidationSchema } from '../../tools/validationSchema'
import { useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from '../../redux/contacts/operations'
import { selectItems } from '../../redux/contacts/selectors'
import { toast } from 'react-hot-toast'
import css from './ContactForm.module.css'

export default function ContactForm() {
  const dispatch = useDispatch()
  const contacts = useSelector(selectItems)
  const uniqueId = useId()

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
      validationSchema={contactsValidationSchema(contacts)}
      onSubmit={handleAddContact}
    >
      <Form className={css.form}>
        <div>
          <Field
            className={css.input}
            name="name"
            id={uniqueId}
          ></Field>
          <label className={css.label} htmlFor={uniqueId}>
            Name
          </label>
          <ErrorMessage
            name="name"
            component="span"
            className={css.error}
          />
        </div>
        <div>
          <Field
            className={css.input}
            name="number"
            id={uniqueId}
          ></Field>
          <label className={css.label} htmlFor={uniqueId}>
            Number
          </label>
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
