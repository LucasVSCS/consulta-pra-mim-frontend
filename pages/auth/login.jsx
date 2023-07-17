import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Image from 'next/image'

import authBackground from '/public/images/auth-background.jpg'
import logoImage from '/public/images/logo.png'

export default function LoginPage () {
  return (
    <Paper sx={{ display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'relative', height: '100vh' }}>
            <Image src={authBackground} layout='fill' objectFit='cover' />
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh'
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
              <Box border={2} borderColor={'#e37d7d'} width={550} height={400}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant='h5' marginTop={2}>
                    Digite suas credenciais
                  </Typography>

                  <TextField
                    label='Nome de usuário'
                    margin='normal'
                    sx={{
                      width: '35vh'
                    }}
                  />

                  <TextField
                    label='Senha'
                    margin='normal'
                    sx={{
                      width: '35vh'
                    }}
                  />

                  <Button
                    variant='contained'
                    color='inherit'
                    sx={{
                      margin: 2,
                      width: '20vh',
                      height: '4vh'
                    }}
                  >
                    Entrar
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
