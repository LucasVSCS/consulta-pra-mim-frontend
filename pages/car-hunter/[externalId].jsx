import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material'
import {useRouter} from 'next/router'
import PageTitle from '../../components/PageTitle'
import {useEffect, useState} from 'react'
import {fetchCarhunter} from "../../services/actions/fetchCarhunter";
import SocialMediaLinks from "../../components/CarHunterDetailsPage/SocialMediaLinks";
import PhoneNumbers from "../../components/CarHunterDetailsPage/PhoneNumbers";
import Header from "../../components/Header";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BackButton from "../../components/BackButton";

export default function CarHunterDetails() {
    const router = useRouter()
    const {externalId} = router.query
    const [carHunter, setCarHunter] = useState(null)

    const links = [{name: 'Pesquisar Consultores', url: '/car-hunter/'}, {
        name: 'Torne-se um Consultor', url: '/car-hunter/signup'
    }]

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price);
    }

    useEffect(() => {
        if (externalId) {
            fetchCarhunter(externalId).then(response => {
                setCarHunter(response)
            })
        }
    }, [externalId])

    return (
        <Paper sx={{minHeight: '100vh'}}>
            <PageTitle label={'Informações do Consultor'}/>
            <Header links={links} isUserLogged={false}/>
            <Container sx={{backgroundColor: '#2F2F2F', minHeight: '80vh', border: 1}}>
                {carHunter && (<>
                    <Box sx={{display: 'flex', alignItems: 'center', pt: 2}}> <BackButton/>
                        <Typography variant='h4' sx={{ml: 2, flexGrow: 1, textAlign: 'center'}}>
                            Informações do Consultor
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', mt: 2}}>
                        <Box sx={{flex: 0.3, display: 'flex', flexDirection: 'column', p: 2}}>
                            <div
                                style={{
                                    width: 200,
                                    height: 200,
                                    cursor: 'pointer',
                                    alignSelf: 'center',
                                    marginTop: 4,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img src={carHunter.logoUrl} alt='Profile Picture'
                                     style={{
                                         maxWidth: '100%',
                                         maxHeight: '100%',
                                         objectFit: 'contain'
                                     }}
                                />
                            </div>

                            <SocialMediaLinks socialMedia={carHunter.socialMedia} phones={carHunter.phones}/>
                            <PhoneNumbers phones={carHunter.phones}/>
                        </Box>
                        <Box sx={{flex: 0.7}}>
                            <Accordion sx={{'& .MuiAccordionDetails-root': {p: 0}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Avatar sx={{bgcolor: '#C0C0C0'}}>👤</Avatar>
                                    <Typography sx={{ml: 2}}>Dados do Consultor</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={`Nome:`} secondary={`${carHunter.name}`}/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={`Email:`} secondary={`${carHunter.email}`}/>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{'& .MuiAccordionDetails-root': {p: 0}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Avatar sx={{bgcolor: '#C0C0C0'}}>📍</Avatar>
                                    <Typography sx={{ml: 2}}>Localização</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={`Cidade de atuação:`}
                                                          secondary={`${carHunter.city.name} - ${carHunter.city.ufCode}`}/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText primary={`Raio de busca:`}
                                                          secondary={`${carHunter.serviceRange.searchRadius} km`}/>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{'& .MuiAccordionDetails-root': {p: 0}}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Avatar sx={{bgcolor: '#C0C0C0'}}>💰</Avatar>
                                    <Typography sx={{ml: 2}}>Faixa de preço e ano</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={`Ano:`}
                                                          secondary={`${carHunter.serviceRange.yearMin} até ${carHunter.serviceRange.brandNew ? '0km' : carHunter.serviceRange.yearMax}`}/>
                                        </ListItem>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Preço:`}
                                                secondary={`${formatPrice(carHunter.serviceRange.priceMin)} até ${formatPrice(carHunter.serviceRange.priceMax)}`}
                                            />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Card sx={{mb: 4, mt: 3}}>
                                <CardHeader avatar={<Avatar sx={{bgcolor: '#C0C0C0'}}>🚗</Avatar>}
                                            title="Descrição dos serviços"/>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                                        {carHunter.serviceDescription}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </>)}
            </Container>
        </Paper>
    )
}
