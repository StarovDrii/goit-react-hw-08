import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useId } from 'react'
import { loginValidationSchema } from '../../tools/validationSchema'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/operations'
import { toast } from 'react-hot-toast'
import css from '../ContactForm/ContactForm.module.css'

export default function LoginForm() {
  const dispatch = useDispatch()
  const uniqueId = useId()

  const handleLogin = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then((value) => {
        toast.success(`Access is allowed, ${value.user.name}`, {
          position: 'top-right',
        })
      })
      .catch(() => {
        toast.error(
          `Access is denied!
        Wrong login or password`,
          {
            position: 'top-right',
          },
        )
      })
    actions.resetForm()
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={loginValidationSchema}
    >
      <Form className={css.form}>
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
          Login
        </button>
      </Form>
    </Formik>
  )
}
