import { Box, Button, CssBaseline, TextField, Typography } from '@mui/material'
import Image from 'next/image'

import authBackground from '/public/images/auth-background.jpg'
import logoImage from '/public/images/logo.png'

export default function LoginPage () {
  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '40%' }}>
          <Box sx={{ position: 'relative', height: '100vh' }}>
            <Image src={authBackground} layout='fill' objectFit='cover' />
          </Box>
        </Box>

        <Box
          sx={{
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'black'
          }}
        >
          <Box
            width={550}
            height={400}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <Image src={logoImage} width={350} height={150} />
            </Box>
            <Box
              border={2}
              borderColor={'#e37d7d'}
              width={550}
              height={400}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography
                variant='h5'
                color={'white'}
                sx={{ marginBottom: 2, marginTop: 2 }}
              >
                Digite suas credenciais
              </Typography>

              <TextField
                label='Nome de usuário'
                InputLabelProps={{ sx: { color: 'white' } }}
                sx={{
                  width: '35vh',
                  marginBottom: 2,
                  input: {
                    background: 'grey'
                  }
                }}
              />
              <TextField
                label='Senha'
                InputLabelProps={{ sx: { color: 'white' } }}
                sx={{
                  width: '35vh',
                  marginBottom: 2,
                  input: {
                    background: 'grey'
                  }
                }}
              />
              <Button
                variant='contained'
                color='inherit'
                sx={{ marginBottom: 2, width: '20vh', height: '4vh' }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
