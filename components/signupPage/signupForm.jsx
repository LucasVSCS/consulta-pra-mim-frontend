import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Typography
} from '@mui/material'
import * as Yup from 'yup'
import BackButton from '../BackButton'
import CityInput from '../CityInput'

import { useSnackbar } from 'notistack'
import { PatternFormat } from 'react-number-format'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  tradingName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  selectedCity: Yup.object()
    .shape({
      id: Yup.string().required('Required')
    })
    .required('Required'),
  phone: Yup.string().required('Required'),
  serviceDescription: Yup.string().required('Required')
})

export default function SignupForm () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = {
      name: values.name,
      tradingName: values.tradingName,
      email: values.email,
      serviceDescription: values.serviceDescription,
      cityId: values.selectedCity.id,
      phones: [
        {
          areaCode: values.phone.replace(/[^0-9]/g, '').slice(0, 2),
          number: values.phone.replace(/[^0-9]/g, '').slice(2),
          isWhatsapp: values.isWhatsapp
        }
      ]
    }

    try {
      const response = await fetch(`${apiUrl}/car-hunters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        resetForm()
        enqueueSnackbar('Cadastro solicitado com sucesso!', {
          variant: 'success'
        })
      } else {
        enqueueSnackbar('Ocorreu um erro ao solicitar o cadastro', {
          variant: 'error'
        })
      }
    } catch (error) {
      enqueueSnackbar('Ocorreu um erro ao solicitar o cadastro', {
        variant: 'error'
      })
    }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        name: '',
        tradingName: '',
        email: '',
        selectedCity: null,
        phone: '',
        isWhatsapp: false,
        serviceDescription: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <BackButton sx={{ mb: 2 }} />
          <Grid
            container
            spacing={0.7}
            padding={3}
            border={1}
            sx={{ backgroundColor: '#2F2F2F' }}
          >
            <Grid item xs>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                Torne-se um consultor
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' sx={{ fontSize: 16 }}>
                Solicite seu cadastro na plataforma mediante os dados abaixo
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name='name'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor='name'>Nome</InputLabel>
                    <Input {...field} id='name' />
                    <FormHelperText error>
                      {form.touched.name && form.errors.name}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name='tradingName'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor='tradingName'>Nome fantasia</InputLabel>
                    <Input {...field} id='tradingName' />
                    <FormHelperText error>
                      {form.touched.tradingName && form.errors.tradingName}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <Input {...field} id='email' type='email' />
                    <FormHelperText error>
                      {form.touched.email && form.errors.email}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name='selectedCity'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <CityInput
                      {...field}
                      sx={{ mt: 0.4 }}
                      variant='standard'
                      setSelectedCity={value =>
                        form.setFieldValue(field.name, value)
                      }
                    />
                    <FormHelperText error>
                      {form.touched.selectedCity && form.errors.selectedCity}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name='phone'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor='phone'>Telefone</InputLabel>
                    <PatternFormat
                      {...field}
                      customInput={Input}
                      format='(##) #####-####'
                      id='phone'
                    />
                    <FormHelperText error>
                      {form.touched.phone && form.errors.phone}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name='isWhatsapp'>
                {({ field }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={() =>
                            form.setFieldValue(field.name, !field.value)
                          }
                        />
                      }
                      label='É Whastapp'
                    />
                    <ErrorMessage name='isWhatsapp' />
                  </>
                )}
              </Field>
            </Grid>
            <Grid item xs>
              <Field name='serviceDescription'>
                {({ field, form }) => (
                  <FormControl fullWidth margin='normal'>
                    <InputLabel htmlFor='serviceDescription'>
                      Descrição do serviço
                    </InputLabel>
                    <Input rows={6} {...field} id='serviceDescription' />
                    <FormHelperText error>
                      {form.touched.serviceDescription &&
                        form.errors.serviceDescription}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </Grid>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={isSubmitting}
            >
              Solicitar cadastro
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
