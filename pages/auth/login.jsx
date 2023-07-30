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

import PageTitle from '../../components/PageTitle'
import LogoImage from '../../components/LogoImage'
import BackgroundImage from '../../components/BackgroundImage'

import { login } from '../../services/actions/authAction'
import authBackground from '/public/images/auth-background.jpg'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

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

  const router = useRouter()

  const handleLogin = async () => {
    const result = await login(username, password)
    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error)
    }
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
          <Box border={2} borderColor={'#e37d7d'} width={550} height={400}>
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

              <TextField
                label='Nome de usuário'
                margin='normal'
                size='small'
                value={username}
                onChange={event => setUsername(event.target.value)}
                sx={{
                  width: '35vh'
                }}
              />

              <TextField
                label='Senha'
                type='password'
                margin='normal'
                size='small'
                value={password}
                onChange={event => setPassword(event.target.value)}
                sx={{
                  width: '35vh'
                }}
              />

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
