import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import BackgroundImage from '../../components/BackgroundImage'
import PageTitle from '../../components/PageTitle'
import LogoImage from '../../components/LogoImage'

import authBackground from '/public/images/auth-background.jpg'
import { login } from '../../services/actions/authAction'

export default function LoginPage () {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const propsLogo = {
    width: 350,
    height: 150,
    marginBottom: 2
  }

  const propsBackgrounImage = {
    flexBasis: { xs: '100%', md: '40%' },
    position: 'relative',
    height: '100vh'
  }

  const handleLogin = async () => {
    const result = await login(username, password)

    if (result.success) {
      return router.push('/admin/dashboard')
    }

    enqueueSnackbar('Credenciais inválidas', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  }

  return (
    <Paper sx={{ display: 'flex' }}>
      <PageTitle label='Painel - Login' />

      <BackgroundImage image={authBackground} sx={propsBackgrounImage} />

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
          <LogoImage sx={propsLogo} />
          <Box
            sx={{ backgroundColor: 'background.paper' }}
            border={1}
            width={550}
            height={400}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography variant='h6' marginTop={2}>
                Digite suas credenciais
              </Typography>

              <Box sx={{ width: '35vh' }}>
                <TextField
                  fullWidth
                  label='Nome de usuário'
                  margin='normal'
                  size='small'
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />

                <TextField
                  fullWidth
                  label='Senha'
                  type='password'
                  margin='normal'
                  size='small'
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Box>

              <Button
                variant='contained'
                color='inherit'
                onClick={handleLogin}
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
    </Paper>
  )
}

export const getServerSideProps = async ctx => {
  const cookies = parseCookies(ctx)
  const token = cookies.token

  if (token) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
