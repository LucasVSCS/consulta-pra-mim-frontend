import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import Head from 'next/head'
import Header from '../../components/Header'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/router'

export default function CarHunterDetails () {
  const handleButtonClick = () => {
    router.push('/admin/dashboard')
  }
  const router = useRouter()

  return (
    <Paper sx={{ height: '100vh' }}>
      <Head>
        <title>Pesquisar Consultores</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title={'Pesquisar Consultores'} />

      <Box sx={{ height: '100vh', p: 2 }}>
        <Container
          sx={{
            backgroundColor: '#2F2F2F',
            minHeight: '70vh',
            border: 2,
            borderColor: '#f98989'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              sx={{
                padding: '10px 22px',
                height: 45,
                border: '1px solid white',
                color: 'white'
              }}
              onClick={() => router.back()}
            >
              Voltar
            </Button>

            <Typography
              variant='h4'
              sx={{ ml: 2, flexGrow: 1, textAlign: 'center' }}
            >
              Nome do Consultor
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Box sx={{ flex: 0.3, display: 'flex', flexDirection: 'column' }}>
              <Avatar
                sx={{ width: 100, height: 100, alignSelf: 'center', mt: 4 }}
              />
              <Box
                sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}
              >
                <FacebookIcon sx={{ fontSize: 35 }} />
                <InstagramIcon sx={{ fontSize: 35 }} />
                <WhatsAppIcon sx={{ fontSize: 35 }} />
              </Box>
            </Box>
            <Box sx={{ flex: 0.7 }}>
              <List>
                <ListItem>
                  <ListItemText primary='Nome: Pedro Alvaro' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Cidade de atuação: Salvador' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Raio de busca: 100km' />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Trabalha com carros de:' />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary='2017 até 0km'
                    primaryTypographyProps={{ style: { marginLeft: '10%' } }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary='Entre R$50.000 e R$250.000'
                    primaryTypographyProps={{ style: { marginLeft: '10%' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='Descrição dos serviços'
                    primaryTypographyProps={{ align: 'center', variant: 'h5' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim eros et est eleifend, at egestas purus tempus. Proin dapibus nibh eget sem hendrerit sollicitudin. Duis viverra turpis ut fermentum mattis. Donec tempus felis nulla, id efficitur neque fermentum eu. Donec dapibus mattis nibh ut pretium. Aenean tempus fermentum consectetur. Donec pulvinar maximus bibendum. Sed semper enim dolor, quis scelerisque leo semper venenatis. Maecenas tempus venenatis ultrices. Quisque sagittis ultricies turpis mollis placerat. Vestibulum lorem quam, bibendum sed justo in, ultricies semper nulla. Integer blandit ornare ante ac convallis. Curabitur dictum ante in rutrum viverra. Etiam lobortis, lorem ac tincidunt ultrices, nisl augue imperdiet dui, sed commodo neque ipsum ac risus.' />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Container>
      </Box>
    </Paper>
  )
}
