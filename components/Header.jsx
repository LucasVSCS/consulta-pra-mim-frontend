import {AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {AccountCircle} from '@mui/icons-material'
import React from 'react'
import {useRouter} from 'next/router'
import LogoImage from './LogoImage'
import {getUserToken} from "../services/utils/AuthUtils";
import Link from "next/link";

export default function Header({logoUrlRedirect, links, isUserLogged = true}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const router = useRouter()

    const propsLogo = {
        cursor: 'pointer', width: 130, height: 50
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const logout = () => {
        setAnchorEl(null)
        document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain = domain.replace(/^\.?[^.]+/, ''), document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`, domain), location.hostname));
        router.push('/auth/login')
    }

    const handleImageClick = () => {
        router.push(logoUrlRedirect)
    }

    return (
        <Box marginBottom={3}>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <LogoImage sx={propsLogo} onClick={handleImageClick}/>
                        {links.map((link, index) => (
                            <Typography key={link.url} variant="h7"
                                        sx={{ml: 2, flexGrow: index === links.length - 1 ? 1 : undefined}}>
                                <Link style={{color: "inherit", textDecoration: "none"}}
                                      href={link.url}>{link.name}
                                </Link>
                            </Typography>
                        ))}

                        {isUserLogged && (
                            <>
                                <Typography variant='h6'>Lucas Vinicius</Typography>
                                <div>
                                    <IconButton size='large' onClick={handleMenu}>
                                        <AccountCircle/>
                                    </IconButton>

                                    <Menu
                                        sx={{marginTop: 5}}
                                        id='menu-appbar'
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top', horizontal: 'right'
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top', horizontal: 'right'
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={logout}>Fazer Logout</MenuItem>
                                    </Menu>
                                </div>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}