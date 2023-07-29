import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material'

import Image from 'next/image'

import registerBackground from '/public/images/register-background.png'
import logoImage from '/public/images/logo.png'
import { useRouter } from 'next/router'
import PageTitle from '../../components/PageTitle'
import CityInput from '../../components/CityInput'
import { useState } from 'react'

export default function CarHunterRegistrationPage () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  const [name, setName] = useState('')
  const [tradingName, setTradingName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [phone, setPhone] = useState('')
  const [isWhatsapp, setIsWhatsapp] = useState(false)
  const [serviceDescription, setServiceDescription] = useState('')

  const handleImageClick = () => {
    router.push('/')
  }

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
        // Trate a resposta bem-sucedida aqui
      } else {
        // Trate a resposta com erro aqui
      }
    } catch (error) {
      // Trate o erro de rede aqui
    }
  }

  return (
    <Paper sx={{ display: 'flex' }}>
      <PageTitle label='Torne-se um Consultor' />

      <Box
        sx={{
          flexBasis: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh'
        }}
      >
        <Box
          width={650}
          height={500}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{ marginBottom: 2, cursor: 'pointer' }}
            position='absolute'
            top={0}
            left={0}
            onClick={handleImageClick}
          >
            <Image src={logoImage} width={230} height={95} />
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={0.7}
              padding={3}
              border={2}
              borderColor={'#e37d7d'}
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
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Registrar-se
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          flexBasis: { xs: '100%', md: '50%' },
          position: 'relative',
          height: '100vh'
        }}
      >
        <Image src={registerBackground} layout='fill' objectFit='cover' />
      </Box>
    </Paper>
  )
}
