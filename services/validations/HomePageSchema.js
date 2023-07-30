import * as Yup from 'yup'

export const HomePageSchema = Yup.object().shape({
  selectedCity: Yup.object()
    .shape({
      id: Yup.string().required('Required')
    })
    .required('Required')
})
