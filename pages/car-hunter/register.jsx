import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  Paper,
  FormControl,
  Grid
} from '@mui/material'

import Image from 'next/image'

import registerBackground from '/public/images/register-background.png'
import logoImage from '/public/images/logo.png'
import Head from 'next/head'

export default function CarHunterRegistrationPage () {
  return (
    <Paper sx={{ display: 'flex' }}>
      <Head>
        <title>Registro de Consultores</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box
        sx={{
          flexBasis: { xs: '100%', md: '50%' },
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
          <Box sx={{ marginBottom: 2 }} position='absolute' top={0} left={0}>
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
            <Grid item xs={12}>
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
                label='Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Consultant Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Consultant Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Consultant Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Service Description'
                margin='normal'
                variant='outlined'
                multiline
                rows={4}
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
