import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import BackButton from '../BackButton'
import CityInput from '../CityInput'
import { useState } from 'react'
import { useSnackbar } from 'notistack'

export default function SignupForm () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const { enqueueSnackbar } = useSnackbar()

  const [name, setName] = useState('')
  const [tradingName, setTradingName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [phone, setPhone] = useState('')
  const [isWhatsapp, setIsWhatsapp] = useState(false)
  const [serviceDescription, setServiceDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const formData = {
      name,
      tradingName,
      email,
      cityId: selectedCity.id,
      serviceDescription,
      phones: [
        {
          areaCode: phone.slice(0, 2),
          number: phone.slice(2),
          isWhatsapp: true
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
        setName('')
        setTradingName('')
        setEmail('')
        setSelectedCity(null)
        setPhone('')
        setIsWhatsapp(false)
        setServiceDescription('')

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
  }

  return (
    <form onSubmit={handleSubmit}>
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
          <TextField
            fullWidth
            label='Nome'
            margin='normal'
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Nome fantasia'
            margin='normal'
            value={tradingName}
            onChange={event => setTradingName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Email'
            margin='normal'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CityInput
            sx={{ marginTop: 2 }}
            size='normal'
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Telefone'
            margin='normal'
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isWhatsapp}
                onChange={event => setIsWhatsapp(event.target.checked)}
              />
            }
            label='É Whastapp'
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label='Descrição do serviço'
            margin='normal'
            multiline
            rows={6}
            value={serviceDescription}
            onChange={event => setServiceDescription(event.target.value)}
          />
          <Button type='submit' variant='contained' sx={{ mt: 1 }} fullWidth>
            Solicitar cadastro
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
