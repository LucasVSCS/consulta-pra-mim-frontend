import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

import authBackground from '/public/images/auth-background.jpg'
import PageTitle from '../../components/PageTitle'
import LogoImage from '../../components/LogoImage'
import { login } from '../../services/actions/authAction'
import { useRouter } from 'next/router'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const router = useRouter()

  const handleLogin = async () => {
    const result = await login(username, password)
    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error)
    }
  }

  const propsLogo = {
    width: 350,
    height: 150,
    marginBottom: 2
  }

  return (
    <Paper sx={{ display: 'flex' }}>
      <PageTitle label='Painel - Login' />

      <Box
        sx={{
          flexBasis: { xs: '100%', md: '40%' },
          position: 'relative',
          height: '100vh'
        }}
      >
        <Image src={authBackground} layout='fill' objectFit='cover' />
      </Box>

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
          <LogoImage {...propsLogo} />
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
