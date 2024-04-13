import * as Yup from 'yup'

const validationSchema = (contacts) => {
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

export default validationSchema

// Знаю що потрібно видаляти закоменотований код, я його не забув а лишив. Пізніше приберу. Не зверкайте уваги будьласка)

// const schema = Yup.object().shape({
//   userName: Yup.string()
//     .min(3, 'Too short')
//     .max(50, 'Too long')
//     .required('Required'),
//   userNumber: Yup.number()
//     .typeError("That doesn't look like a phone number")
//     .integer("A phone number can't include a decimal point")
//     .positive("A phone number can't start with a minus")
//     .test(
//       'is-length',
//       'Must be between 3 and 50 digits',
//       value => (value && /^\d{3,50}$/.test(value.toString()))
//     )
//     .required('A phone number is required'),
// });

// export const schema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, 'Too short')
//     .max(50, 'Too long')
//     .required('Required'),
//   number: Yup.string()
//     .test(
//       'is-valid-format',
//       "That doesn't look like a phone number",
//       (value) => /^[\d-]+$/.test(value),
//     )
//     .min(3, 'Too short')
//     .max(50, 'Too long')
//     .required('Required'),
// });
