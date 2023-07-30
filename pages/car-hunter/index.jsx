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
import { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import { useRouter } from 'next/router'

export default function CarHunterSearchPage () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const router = useRouter()
  const [carHunters, setCarHunters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nameFilter, setNameFilter] = useState('')
  const [tradingNameFilter, setTradingNameFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [serviceDescriptionFilter, setServiceDescriptionFilter] = useState('')

  useEffect(() => {
    const fetchCarHunters = async () => {
      const cityId = router.query.cityId
      const url = new URL(`${apiUrl}/car-hunters`)

      url.searchParams.append('page', currentPage)
      if (cityId) url.searchParams.append('cityId', cityId)
      if (nameFilter) url.searchParams.append('name', nameFilter)
      if (tradingNameFilter)
        url.searchParams.append('tradingName', tradingNameFilter)
      if (emailFilter) url.searchParams.append('email', emailFilter)
      if (serviceDescriptionFilter)
        url.searchParams.append('serviceDescription', serviceDescriptionFilter)

      try {
        const response = await fetch(url.toString())
        const data = await response.json()

        setCarHunters(data.content)
      } catch (error) {}
    }

    fetchCarHunters()
  }, [
    router.query.cityId,
    currentPage,
    nameFilter,
    tradingNameFilter,
    emailFilter,
    serviceDescriptionFilter
  ])

  const handleSearchClick = () => {
    setCurrentPage(1)
  }

  const handleMoreInfoClick = carHunterId => {
    router.push(`/car-hunter/${carHunterId}`)
  }

  return (
    <Paper sx={{ height: '100vh' }}>
      <PageTitle label={'Pesquisar Consultores'} />
      <Header title={'Pesquisar Consultores'} />

      <Container>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#2F2F2F',
            padding: 2,
            border: 2,
            borderColor: '#f98989'
          }}
        >
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
              fullWidth
              sx={{ mb: 1 }}
              value={nameFilter}
              onChange={event => setNameFilter(event.target.value)}
            />
            <TextField
              size='small'
              label='Nome do Consultor'
              fullWidth
              sx={{ mb: 1 }}
              value={tradingNameFilter}
              onChange={event => setTradingNameFilter(event.target.value)}
            />
            <TextField
              size='small'
              label='Email'
              fullWidth
              value={emailFilter}
              onChange={event => setEmailFilter(event.target.value)}
            />
            <TextField
              fullWidth
              label='Descrição do Serviço'
              margin='normal'
              multiline
              rows={6}
              value={serviceDescriptionFilter}
              onChange={event =>
                setServiceDescriptionFilter(event.target.value)
              }
            />

            <Button fullWidth variant='contained' onClick={handleSearchClick}>
              Pesquisar
            </Button>
          </Box>
          <Box sx={{ flex: 0.8, p: 2 }}>
            {carHunters && carHunters.length === 0 ? (
              <Typography variant='h6' align='center'>
                Nenhum resultado encontrado
              </Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {carHunters &&
                    carHunters.map(carHunter => (
                      <Grid item xs={3} key={carHunter.externalId}>
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
                            src={carHunter.logoUrl}
                            alt='Profile Picture'
                            sx={{
                              width: 100,
                              height: 100,
                              cursor: 'pointer',
                              mb: 1,
                              mt: 1
                            }}
                          />
                          <Box>{carHunter.name}</Box>
                          <Box>{`${carHunter.city.name} - ${carHunter.city.ufCode}`}</Box>
                        </Box>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() =>
                            handleMoreInfoClick(carHunter.externalId)
                          }
                        >
                          Mais informações
                        </Button>
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={5}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}
