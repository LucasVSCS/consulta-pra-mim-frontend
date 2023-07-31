import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import CityInput from './CityInput'

export default function DashboardSearchFilter ({ onSearch, onClearFilters }) {
  const handleSearch = values => {
    if (onSearch) {
      onSearch(values)
    }
  }

  const handleClearFilters = resetForm => {
    resetForm()
    if (onClearFilters) {
      onClearFilters()
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        tradingName: '',
        selectedCity: null,
        status: ''
      }}
      onSubmit={handleSearch}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <Grid container spacing={1} mb>
            <Grid item xs>
              <Field
                as={TextField}
                fullWidth
                size='small'
                label='Nome'
                name='name'
              />
            </Grid>
            <Grid item xs>
              <Field
                as={TextField}
                fullWidth
                size='small'
                label='Nome Consultoria'
                name='tradingName'
              />
            </Grid>
            <Grid item xs>
              <Field name='selectedCity'>
                {({ field, form }) => (
                  <CityInput
                    {...field}
                    onChange={(event, newValue) =>
                      form.setFieldValue(field.name, newValue)
                    }
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs>
              <FormControl size='small' fullWidth>
                <InputLabel>Status</InputLabel>
                <Field as={Select} name='status' label='Status'>
                  <MenuItem value=''>
                    <em>Todos</em>
                  </MenuItem>
                  <MenuItem value='1'>Ativo</MenuItem>
                  <MenuItem value='0'>Inativo</MenuItem>
                </Field>
              </FormControl>
            </Grid>
            <Grid item alignSelf={'center'}>
              <Button type='submit' variant='contained' fullWidth>
                Pesquisar
              </Button>
            </Grid>
            <Grid item alignSelf={'center'}>
              <Button
                color='info'
                onClick={() => handleClearFilters(resetForm)}
              >
                Limpar Filtros
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
