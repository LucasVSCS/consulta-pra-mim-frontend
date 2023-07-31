import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Header from '../../../components/Header'
import {useEffect, useState} from 'react'
import {parseCookies} from 'nookies'
import {useRouter} from 'next/router'
import CityInput from '../../../components/CityInput'
import PageTitle from '../../../components/PageTitle'
import {PatternFormat} from 'react-number-format'

export default function EditCarHunter() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const {externalId} = router.query
    const [carHunterData, setcarHunterData] = useState({})
    const [profilePicture, setProfilePicture] = useState(null)
    const [phones, setPhones] = useState([{}, {}])
    const [phone, setPhone] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)

    useEffect(() => {
        if (carHunterData.city) {
            setSelectedCity({
                id: carHunterData.city.id,
                name: carHunterData.city.name,
                ufCode: carHunterData.city.ufCode
            })
        }
    }, [carHunterData.city])

    useEffect(() => {
        setProfilePicture(carHunterData.logoUrl)
    }, [carHunterData.logoUrl])

    useEffect(() => {
        if (carHunterData.phones && carHunterData.phones.length) {
            setPhones(carHunterData.phones)
        }
    }, [carHunterData.phones])

    useEffect(() => {
        if (!externalId) return

        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/car-hunters/${externalId}`)
                const data = await response.json()
                setcarHunterData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [externalId])

    const handleProfilePictureChange = event => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader()
            reader.onload = e => setProfilePicture(e.target.result)
            reader.readAsDataURL(event.target.files[0])
        }
    }

    const handleWhatsAppChange = (event, index) => {
        setPhones(prevPhones => {
            const newPhones = [...prevPhones]
            newPhones[index].isWhatsapp = event.target.checked
            return newPhones
        })
    }

    const handlePhoneChange = (event, index) => {
        const value = event.target.value
        setPhone(value)
        if (value === '') {
            setPhones(prevPhones => {
                const newPhones = [...prevPhones]
                newPhones[index].areaCode = ''
                newPhones[index].number = ''
                return newPhones
            })
        } else {
            const unmaskedValue = value.replace(/\D/g, '')
            const areaCode = unmaskedValue.slice(0, 2)
            const number = unmaskedValue.slice(2)
            setPhones(prevPhones => {
                const newPhones = [...prevPhones]
                newPhones[index].areaCode = areaCode
                newPhones[index].number = number
                return newPhones
            })
        }
    }

    const formatPhoneNumber = (areaCode, number) => {
        if (!areaCode || !number) return ''
        const formattedNumber = `${number.slice(0, 5)}-${number.slice(5)}`
        return `(${areaCode}) ${formattedNumber}`
    }

    const handleSave = async () => {
        const cookies = parseCookies()
        const token = cookies.token

        const data = {
            name: carHunterData.name,
            tradingName: carHunterData.tradingName,
            email: carHunterData.email,
            cityId: selectedCity.id,
            serviceDescription: carHunterData.serviceDescription,
            isActive: carHunterData.isActive,
            phones: phones,
            socialMedia: {
                facebookUrl: carHunterData.socialMedia.facebookUrl,
                instagramUrl: carHunterData.socialMedia.instagramUrl
            },
            serviceRange: {
                searchRadius: carHunterData.serviceRange.searchRadius,
                yearMin: carHunterData.serviceRange.yearMin,
                yearMax: carHunterData.serviceRange.yearMax,
                priceMin: carHunterData.serviceRange.priceMin,
                priceMax: carHunterData.serviceRange.priceMax,
                brandNew: carHunterData.serviceRange.brandNew
            }
        }

        await updateCarHunterData(externalId, data, token)
    }

    async function updateCarHunterData(externalId, data, token) {
        try {
            const response = await fetch(`${apiUrl}/car-hunters/${externalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`)
            }
            const responseData = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Paper sx={{height: '100vh'}}>
            <PageTitle label={'Editar Consultor Automotivo'}/>
            <Header title={'Editar Consultor Automotivo'}/>

            <Box display='flex' flexDirection='column' alignItems='center'>
                <Box
                    component='form'
                    maxWidth={1500}
                    sx={{
                        backgroundColor: '#2F2F2F',
                        padding: 2,
                        border: 1
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
                            <Typography
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                variant='h6'
                                marginBottom={1}
                            >
                                Dados do consultor
                            </Typography>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleProfilePictureChange}
                                    hidden
                                    id='profile-picture-input'
                                />
                                <label htmlFor='profile-picture-input'>
                                    <Avatar
                                        src={profilePicture}
                                        alt='Profile Picture'
                                        sx={{width: 100, height: 100, cursor: 'pointer'}}
                                    />
                                </label>
                            </Box>
                        </Grid>

                        {/* Inicio inputs dos dados do Consultor */}
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Name'
                                margin='normal'
                                variant='outlined'
                                size='small'
                                value={carHunterData.name}
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        name: event.target.value
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField
                                fullWidth
                                label='Email'
                                margin='normal'
                                size='small'
                                variant='outlined'
                                value={carHunterData.email}
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        email: event.target.value
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Consultant Name'
                                margin='normal'
                                size='small'
                                variant='outlined'
                                value={carHunterData.tradingName}
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        tradingName: event.target.value
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                            <CityInput
                                sx={{marginTop: 2}}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={carHunterData.isActive || false}
                                        onChange={event =>
                                            setcarHunterData(prevData => ({
                                                ...prevData,
                                                isActive: event.target.checked
                                            }))
                                        }
                                    />
                                }
                                label='Usuário ativo'
                            />
                        </Grid>
                        {/* Fim inputs dos dados do Consultor */}

                        <Grid item xs={12}>
                            <Typography variant='h6'>Redes Sociais</Typography>
                        </Grid>

                        {/* Inicio inputs dos dados das redes sociais */}
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Facebook'
                                size='small'
                                value={
                                    carHunterData.socialMedia &&
                                    carHunterData.socialMedia.facebookUrl
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        socialMedia: {
                                            ...prevData.socialMedia,
                                            facebookUrl: event.target.value
                                        }
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Instagram'
                                size='small'
                                value={
                                    carHunterData.socialMedia &&
                                    carHunterData.socialMedia.instagramUrl
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        socialMedia: {
                                            ...prevData.socialMedia,
                                            instagramUrl: event.target.value
                                        }
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        {/* Fim inputs dos dados das redes sociais */}

                        <Grid item xs={12}>
                            <Typography variant='h6'>Telefones</Typography>
                        </Grid>

                        {/* Inicio inputs dos telefones */}
                        {phones.map((phone, index) => (
                            <Grid item xs key={index}>
                                <PatternFormat
                                    fullWidth
                                    size='small'
                                    value={formatPhoneNumber(phone.areaCode, phone.number)}
                                    customInput={TextField}
                                    format='(##) #####-####'
                                    id='phone'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={phone.isWhatsapp || false}
                                            onChange={event => handleWhatsAppChange(event, index)}
                                        />
                                    }
                                    label='É Whastapp'
                                />
                            </Grid>
                        ))}
                        {/* Fim inputs dos telefones */}

                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                Especificações do serviço de consulta
                            </Typography>
                        </Grid>

                        {/* Inicio inputs dos dados do serviço */}
                        <Grid item xs>
                            <OutlinedInput
                                fullWidth
                                size='small'
                                value={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.searchRadius
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceRange: {
                                            ...prevData.serviceRange,
                                            searchRadius: event.target.value
                                        }
                                    }))
                                }
                                endAdornment={
                                    <InputAdornment position='end'>km</InputAdornment>
                                }
                            />
                            <FormHelperText>Área de cobertura</FormHelperText>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Year MIN'
                                size='small'
                                value={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.yearMin
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceRange: {
                                            ...prevData.serviceRange,
                                            yearMin: event.target.value
                                        }
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Year MAX'
                                size='small'
                                value={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.yearMax
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceRange: {
                                            ...prevData.serviceRange,
                                            yearMax: event.target.value
                                        }
                                    }))
                                }
                                disabled={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.brandNew
                                }
                                InputLabelProps={{shrink: true}}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            (carHunterData.serviceRange &&
                                                carHunterData.serviceRange.brandNew) ||
                                            false
                                        }
                                        onChange={event => {
                                            setcarHunterData(prevData => ({
                                                ...prevData,
                                                serviceRange: {
                                                    ...prevData.serviceRange,
                                                    brandNew: event.target.checked,
                                                    yearMax: event.target.checked
                                                        ? ''
                                                        : prevData.serviceRange.yearMax
                                                }
                                            }))
                                        }}
                                    />
                                }
                                label='0km'
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Price MIN'
                                size='small'
                                value={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.priceMin
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceRange: {
                                            ...prevData.serviceRange,
                                            priceMin: event.target.value
                                        }
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Price MAX'
                                size='small'
                                value={
                                    carHunterData.serviceRange &&
                                    carHunterData.serviceRange.priceMax
                                }
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceRange: {
                                            ...prevData.serviceRange,
                                            priceMax: event.target.value
                                        }
                                    }))
                                }
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        {/* Fim inputs dos dados do serviço */}

                        <Grid item xs={12}>
                            <Typography variant='h6'>Descrição do serviço</Typography>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                label='Service Description'
                                margin='normal'
                                size='small'
                                multiline
                                rows={10}
                                InputLabelProps={{shrink: true}}
                                value={carHunterData.serviceDescription}
                                onChange={event =>
                                    setcarHunterData(prevData => ({
                                        ...prevData,
                                        serviceDescription: event.target.value
                                    }))
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs alignItems={'end'}>
                        <Button variant='contained' onClick={handleSave}>
                            Salvar
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

export const getServerSideProps = async ctx => {
    const cookies = parseCookies(ctx)
    const token = cookies.token

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
