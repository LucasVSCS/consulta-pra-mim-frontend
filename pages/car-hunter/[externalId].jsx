import {Avatar, Box, Button, Container, List, ListItem, ListItemText, Paper, Typography} from '@mui/material'
import Header from '../../components/Header'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {ArrowBack} from '@mui/icons-material'
import {useRouter} from 'next/router'
import PageTitle from '../../components/PageTitle'
import {useEffect, useState} from 'react'

export default function CarHunterDetails() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const {externalId} = router.query
    const [carHunter, setCarHunter] = useState(null)

    const links = [
        {name: 'Pesquisar Consultores', url: '/car-hunter/'},
        {name: 'Torne-se um Consultor', url: '/car-hunter/signup'},
    ]

    useEffect(() => {
        const fetchCarHunter = async () => {
            try {
                const response = await fetch(`${apiUrl}/car-hunters/${externalId}`)
                const data = await response.json()
                setCarHunter(data)
            } catch (error) {
                // Trate o erro de rede aqui
            }
        }

        if (externalId) fetchCarHunter()
    }, [externalId])

    return (
        <Paper sx={{height: '100vh'}}>
            <PageTitle label={'Informações do Consultor'}/>
            <Header links={links} isUserLogged={false}/>

            <Box sx={{height: '100vh', p: 2}}>
                <Container
                    sx={{
                        backgroundColor: '#2F2F2F',
                        minHeight: '70vh',
                        border: 2,
                        borderColor: '#f98989'
                    }}
                >
                    {carHunter && (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center', pt: 2}}>
                                <Button
                                    startIcon={<ArrowBack/>}
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
                                    sx={{ml: 2, flexGrow: 1, textAlign: 'center'}}
                                >
                                    Dados do Consultor
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', mt: 2}}>
                                <Box
                                    sx={{flex: 0.3, display: 'flex', flexDirection: 'column'}}
                                >
                                    <Avatar
                                        src={carHunter.logoUrl}
                                        sx={{width: 100, height: 100, alignSelf: 'center', mt: 4}}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            mt: 3
                                        }}
                                    >
                                        {carHunter.socialMedia && (
                                            <a
                                                href={carHunter.socialMedia.facebookUrl}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <FacebookIcon sx={{fontSize: 35}}/>
                                            </a>
                                        )}
                                        {carHunter.socialMedia && (
                                            <a
                                                href={carHunter.socialMedia.instagramUrl}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <InstagramIcon sx={{fontSize: 35}}/>
                                            </a>
                                        )}
                                        {carHunter.phones &&
                                            carHunter.phones.map(phone => {
                                                if (phone.isWhatsapp) {
                                                    return (
                                                        <a
                                                            key={phone.number}
                                                            href={`https://wa.me/${phone.areaCode}${phone.number}`}
                                                            target='_blank'
                                                            rel='noreferrer'
                                                        >
                                                            <WhatsAppIcon sx={{fontSize: 35}}/>
                                                        </a>
                                                    )
                                                }
                                                return null
                                            })}
                                    </Box>
                                </Box>
                                <Box sx={{flex: 0.7}}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={`Nome: ${carHunter.name}`}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Cidade de atuação: ${carHunter.city.name} - ${carHunter.city.ufCode}`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Raio de busca: ${carHunter.serviceRange.searchRadius} km`}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary={`Trabalha com carros de:`}/>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                primary={`${carHunter.serviceRange.yearMin} até ${
                                                    carHunter.serviceRange.brandNew
                                                        ? '0km'
                                                        : carHunter.serviceRange.yearMax
                                                }`}
                                                primaryTypographyProps={{
                                                    style: {marginLeft: '10%'}
                                                }}
                                            />
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemText
                                                primary={`R$ ${carHunter.serviceRange.priceMin} até R$ ${carHunter.serviceRange.priceMax}`}
                                                primaryTypographyProps={{
                                                    style: {marginLeft: '10%'}
                                                }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary='Descrição dos serviços'
                                                primaryTypographyProps={{
                                                    align: 'center',
                                                    variant: 'h5'
                                                }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`${carHunter.serviceDescription}`}
                                            />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </>
                    )}
                </Container>
            </Box>
        </Paper>
    )
}
