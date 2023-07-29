import { Box, TextField, Typography, Button, Paper, Grid } from '@mui/material'

import Image from 'next/image'

import registerBackground from '/public/images/register-background.png'
import logoImage from '/public/images/logo.png'
import { useRouter } from 'next/router'
import PageTitle from '../../components/PageTitle'
import CityInput from '../../components/CityInput'
import { useState } from 'react'

export default function CarHunterRegistrationPage () {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState(null)

  const handleImageClick = () => {
    router.push('/')
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
              <TextField fullWidth label='Nome' margin='normal' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nome fantasia' margin='normal' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth label='Email' margin='normal' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CityInput
                size='normal'
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Telefone' margin='normal' />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                label='Descrição do serviço'
                margin='normal'
                multiline
                rows={6}
              />
              <Button variant='contained' sx={{ mt: 1 }} fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
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
