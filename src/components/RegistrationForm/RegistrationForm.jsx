import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useId } from 'react'
import { registrationValidationSchema } from '../../tools/validationSchema'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/operations'
import { toast } from 'react-hot-toast'
import css from '../ContactForm/ContactForm.module.css'

export default function RegistrationForm() {
  const dispatch = useDispatch()
  const uniqueId = useId()

  const handleRegistrate = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((value) => {
        toast.success(
          `Congratulations, ${value.name}. Registration is successful`,
          {
            position: 'top-right',
          },
        )
      })
      .catch((error) => {
        console.log(error)
        toast.error(`Sorry. Failed to register.`, {
          position: 'top-right',
        })
      })
    actions.resetForm()
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={handleRegistrate}
      validationSchema={registrationValidationSchema}
    >
      <Form className={css.form}>
        <div>
          <Field
            className={css.input}
            type="text"
            name="name"
            id={`${uniqueId}-name`}
          />
          <label className={css.label} htmlFor={`${uniqueId}-name`}>
            Name
          </label>
          <ErrorMessage
            className={css.error}
            name="name"
            component="span"
          />
        </div>
        <div>
          <Field
            className={css.input}
            type="text"
            name="email"
            id={`${uniqueId}-email`}
          />
          <label className={css.label} htmlFor={`${uniqueId}-email`}>
            Email
          </label>
          <ErrorMessage
            className={css.error}
            name="email"
            component="span"
          />
        </div>
        <div>
          <Field
            className={css.input}
            type="text"
            name="password"
            id={`${uniqueId}-password`}
          />
          <label
            className={css.label}
            htmlFor={`${uniqueId}-password`}
          >
            Password
          </label>
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </div>
        <button className={css.btn} type="submit">
          Registrate
        </button>
      </Form>
    </Formik>
  )
}
