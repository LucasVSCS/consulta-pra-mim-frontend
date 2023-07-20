import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'

import Image from 'next/image'
import logoImage from '/public/images/logo.png'
import { AccountCircle } from '@mui/icons-material'
import React from 'react'

export default function Header () {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Image src={logoImage} width={130} height={50} />
          <Typography variant='h6' sx={{ flexGrow: 1, ml: 2 }}>
            Painel Principal - Dashboard
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
  )
}
