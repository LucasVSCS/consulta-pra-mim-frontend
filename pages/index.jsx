import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import backgroundImage from '/public/images/index-background.png'
import { useRouter } from 'next/router'
import PageTitle from '../components/PageTitle'
import CityInput from '../components/CityInput'
import LogoImage from '../components/LogoImage'

export default function HomePage () {
  const theme = useTheme()
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState(null)
  const propsLogo = {
    mb: 2,
    width: 230,
    height: 100
  }

  const handleSignUpClick = () => {
    router.push('/car-hunter/signup')
  }

  const handleSearchClick = () => {
    if (selectedCity) {
      router.push(`/car-hunter?cityId=${selectedCity.id}`)
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <PageTitle label='Consulta pra mim' />

      <Box sx={{ flex: 1, position: 'relative' }}>
        <Image
          src={backgroundImage}
          layout='fill'
          objectFit='cover'
          alt='Background Image'
        />
      </Box>
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          border={2}
          borderColor={'#f98989'}
          sx={{
            minWidth: '700px',
            minHeight: '300px',
            position: 'absolute',
            left: '40%',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <LogoImage sx={propsLogo} />
          <Typography variant='h6' align='center' sx={{ fontWeight: 'bold' }}>
            A melhor disponibilidade de Car Hunters perto de você
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CityInput
              sx={{ width: '55%' }}
              label='Onde deseja encontrar seu consultor?'
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
            <Button
              variant='contained'
              color='inherit'
              sx={{
                margin: 2,
                width: '15vh'
              }}
              onClick={handleSearchClick}
            >
              Pesquisar
            </Button>
          </Box>
          <Typography
            variant='h6'
            align='center'
            sx={{ fontWeight: 'light', fontSize: 15, cursor: 'pointer' }}
            onClick={handleSignUpClick}
          >
            Tornar-se um Consultor
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 'auto',
            marginBottom: 2,
            marginLeft: 2,
            marginRight: 2
          }}
        ></Box>
      </Paper>
    </Box>
  )
}
