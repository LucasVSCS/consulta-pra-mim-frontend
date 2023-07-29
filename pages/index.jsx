import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logoImage from '/public/images/logo.png'
import backgroundImage from '/public/images/index-background.png'
import { useRouter } from 'next/router'
import PageTitle from '../components/PageTitle'

export default function HomePage () {
  const theme = useTheme()
  const router = useRouter()

  const handleSignUpClick = () => {
    router.push('/car-hunter/signup')
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
          <Box marginBottom={2}>
            <Image src={logoImage} width={230} height={100} />
          </Box>
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
            <TextField
              size='small'
              sx={{ width: '55%' }}
              label='Onde deseja encontrar seu consultor?'
              variant='outlined'
            />
            <Button
              variant='contained'
              color='inherit'
              sx={{
                margin: 2,
                width: '15vh'
              }}
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
