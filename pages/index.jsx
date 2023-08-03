import { Box, Paper, Typography, Button, FormHelperText } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'

import BackgroundImage from '../components/BackgroundImage'
import PageTitle from '../components/PageTitle'
import LogoImage from '../components/LogoImage'
import CityInput from '../components/CityInput'

import backgroundImage from '../public/images/index-background.png'
import { HomePageSchema } from '../services/validations/HomePageSchema'

export default function HomePage () {
  const router = useRouter()

  const propsLogo = {
    mb: 2,
    width: 220,
    height: 110
  }

  const propsBackgrounImage = { flex: 1, position: 'relative' }

  const handleSignUpClick = () => {
    router.push('/car-hunter/signup')
  }

  const handleSearchClick = values => {
    if (values.selectedCity) {
      router.push(`/car-hunter?cityId=${values.selectedCity.id}`)
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <PageTitle label='Consulta pra mim' />

      <BackgroundImage image={backgroundImage} sx={propsBackgrounImage} />

      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          border={1}
          sx={{
            minWidth: '700px',
            minHeight: '300px',
            position: 'absolute',
            left: '40%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            padding: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <LogoImage sx={propsLogo} />
          <Typography variant='h6' align='center' sx={{ fontWeight: 'bold' }}>
            A melhor disponibilidade de Car Hunters perto de você
          </Typography>
          <Formik
            initialValues={{
              selectedCity: null
            }}
            validationSchema={HomePageSchema}
            onSubmit={handleSearchClick}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  <Box sx={{ width: '55%', mt: 1.8 }} flexDirection={'column'}>
                    <Field name='selectedCity'>
                      {({ field, form }) => (
                        <>
                          <CityInput
                            {...field}
                            label='Onde deseja encontrar seu consultor?'
                            onChange={(event, newValue) =>
                              form.setFieldValue(field.name, newValue)
                            }
                          />
                          <FormHelperText error>
                            {form.touched.selectedCity &&
                              form.errors.selectedCity}
                          </FormHelperText>
                        </>
                      )}
                    </Field>
                  </Box>
                  <Button
                    type='submit'
                    variant='contained'
                    color='inherit'
                    disabled={isSubmitting}
                    sx={{
                      margin: 2,
                      width: '15vh'
                    }}
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Typography
            variant='h6'
            align='center'
            sx={{ fontWeight: 'light', fontSize: 15, cursor: 'pointer', mt: 2 }}
            onClick={handleSignUpClick}
          >
            Tornar-se um Consultor
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
