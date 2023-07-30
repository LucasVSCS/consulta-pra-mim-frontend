import { Box, Paper } from '@mui/material'
import { useRouter } from 'next/router'

import PageTitle from '../../components/PageTitle'
import LogoImage from '../../components/LogoImage'
import SignupForm from '../../components/signupPage/signupForm'
import BackgroundImage from '../../components/BackgroundImage'

import registerBackground from '/public/images/register-background.png'

export default function CarHunterRegistrationPage () {
  const router = useRouter()

  const propsLogo = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    mb: 2,
    width: 250,
    height: 100
  }

  const propsBackgrounImage = {
    flexBasis: { xs: '100%', md: '50%' },
    position: 'relative',
    height: '100vh'
  }

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
          height={600}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <LogoImage sx={propsLogo} onClick={handleImageClick} />
          <SignupForm />
        </Box>
      </Box>
      <BackgroundImage image={registerBackground} sx={propsBackgrounImage} />
    </Paper>
  )
}
