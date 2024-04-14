import * as Yup from 'yup'

export const contactsValidationSchema = (contacts) => {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .test(
        'is-unique-name',
        'Name already exists',
        function (value) {
          return (
            !contacts || !contacts.some(({ name }) => name === value)
          )
        },
      )
      .required('Required'),
    number: Yup.string()
      .test(
        'is-valid-format',
        "That doesn't look like a phone number",
        (value) => /^[\d-]+$/.test(value),
      )
      .min(3, 'Too short')
      .max(50, 'Too long')
      .test(
        'is-unique-number',
        'Number already exists',
        function (value) {
          return (
            !contacts ||
            !contacts.some(({ number }) => number === value)
          )
        },
      )
      .required('Required'),
  })
}

export const registrationValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Minimum 7 characters')
    .required('Required'),
})

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string().required('Required'),
})
