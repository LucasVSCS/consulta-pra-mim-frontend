import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Header from '../../components/Header'
import { useState } from 'react'
import Head from 'next/head'

export default function CarHunterSearchPage () {
  const [profilePicture, setProfilePicture] = useState(
    'https://i.pravatar.cc/300'
  )

  return (
    <Paper sx={{ height: '100vh' }}>
      <Head>
        <title>Pesquisar Consultores</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title={'Pesquisar Consultores'} />

      <Container>
        <Box sx={{ display: 'flex', backgroundColor: '#2F2F2F', padding: 2 }}>
          <Box sx={{ flex: 0.2, p: 1 }}>
            <Typography
              variant='h6'
              align='center'
              sx={{ fontWeight: 'light', fontSize: '16px', mb: 2 }}
            >
              Filtros de pesquisa
            </Typography>
            <TextField
              size='small'
              label='Nome'
              variant='outlined'
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              size='small'
              label='Cidade'
              variant='outlined'
              fullWidth
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex' }}>
              <TextField
                size='small'
                label='Ano Min.'
                variant='outlined'
                sx={{ mb: 1, mr: 1, flex: 1 }}
              />
              <TextField
                size='small'
                label='Ano Max.'
                variant='outlined'
                sx={{ flex: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <TextField
                size='small'
                label='Valor Min.'
                variant='outlined'
                sx={{ mr: 1, flex: 1 }}
              />
              <TextField
                size='small'
                label='Valor Max.'
                variant='outlined'
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField
              fullWidth
              label='Descrição do Serviço'
              margin='normal'
              variant='outlined'
              multiline
              rows={3}
            />

            <Button fullWidth variant='contained'>
              Pesquisar
            </Button>
          </Box>
          <Box sx={{ flex: 0.8, p: 2 }}>
            <Grid container spacing={2}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      minHeight: 150,
                      bgcolor: 'grey.500',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1
                    }}
                  >
                    <Avatar
                      src={profilePicture}
                      alt='Profile Picture'
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: 'pointer',
                        mb: 1,
                        mt: 1
                      }}
                    />
                    <Box>Nome do Consultor</Box>
                    <Box>Cidade</Box>
                  </Box>
                  <Button variant='contained' fullWidth>
                    Mais informações
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination count={10} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}
