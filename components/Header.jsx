import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'

import { AccountCircle } from '@mui/icons-material'
import React from 'react'
import { useRouter } from 'next/router'
import LogoImage from './LogoImage'

export default function Header ({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const router = useRouter()

  const propsLogo = {
    cursor: 'pointer',
    width: 130,
    height: 50
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleImageClick = () => {
    router.push('/admin/dashboard')
  }

  return (
    <Box marginBottom={5}>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar>
            <LogoImage sx={propsLogo} onClick={handleImageClick} />
            <Typography variant='h6' sx={{ flexGrow: 1, ml: 2 }}>
              {title}
            </Typography>

            <Typography variant='h6'>Lucas Vinicius</Typography>
            <div>
              <IconButton size='large' onClick={handleMenu}>
                <AccountCircle />
              </IconButton>

              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
