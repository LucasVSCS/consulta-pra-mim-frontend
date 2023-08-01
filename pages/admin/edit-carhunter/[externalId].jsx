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
import {useFormik} from 'formik';
import * as Yup from 'yup';

export default function EditCarHunter() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()
    const {externalId} = router.query
    const [carHunterData, setcarHunterData] = useState({})
    const [profilePicture, setProfilePicture] = useState(null)
    const [phones, setPhones] = useState([{}, {}])
    const [phone, setPhone] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)

    // Formik form state and validation
    const formik = useFormik({
        initialValues: {
            name: '',
            tradingName: '',
            email: '',
            selectedCity: null,
            serviceDescription: '',
            isActive: false,
            phones: [],
            socialMedia: {
                facebookUrl: '', instagramUrl: ''
            },
            serviceRange: {
                searchRadius: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '', brandNew: false
            }
        }, validationSchema: Yup.object({
            name: Yup.string().required('Required')
        }), onSubmit: async values => {
            const cookies = parseCookies();
            const token = cookies.token;

            await updateCarHunterData(externalId, values, token);
        }
    });

    useEffect(() => {
        formik.setValues({
            name: carHunterData.name || '',
            tradingName: carHunterData.tradingName || '',
            email: carHunterData.email || '',
            cityId: carHunterData.city ? carHunterData.city.id : '',
            serviceDescription: carHunterData.serviceDescription || '',
            isActive: carHunterData.isActive || false,
            phones: carHunterData.phones || [],
            socialMedia: {
                facebookUrl: carHunterData.socialMedia && carHunterData.socialMedia.facebookUrl ? carHunterData.socialMedia.facebookUrl : '',
                instagramUrl: carHunterData.socialMedia && carHunterData.socialMedia.instagramUrl ? carHunterData.socialMedia.instagramUrl : ''
            },
            serviceRange: {
                searchRadius: carHunterData.serviceRange && carHunterData.serviceRange.searchRadius ? carHunterData.serviceRange.searchRadius : '',
                yearMin: carHunterData.serviceRange && carHunterData.serviceRange.yearMin ? carHunterData.serviceRange.yearMin : '',
                yearMax: carHunterData.serviceRange && carHunterData.serviceRange.yearMax ? carHunterData.serviceRange.yearMax : '',
                priceMin: carHunterData.serviceRange && carHunterData.serviceRange.priceMin ? carHunterData.serviceRange.priceMin : '',
                priceMax: carHunterData.serviceRange && carHunterData.serviceRange.priceMax ? carHunterData.serviceRange.priceMax : '',
                brandNew: carHunterData.serviceRange && carHunterData.serviceRange.brandNew ? carHunterData.serviceRange.brandNew : false
            }
        });
    }, [carHunterData]);

    useEffect(() => {
        if (selectedCity) {
            setcarHunterData(prevCarHunterData => {
                const newCarHunterData = {...prevCarHunterData}
                newCarHunterData.city = {
                    id: selectedCity.id, name: selectedCity.name, ufCode: selectedCity.ufCode
                }
                return newCarHunterData
            })
        }
    }, [selectedCity])

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

    async function updateCarHunterData(externalId, data, token) {
        try {
            const response = await fetch(`${apiUrl}/car-hunters/${externalId}`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json', Authorization: `${token}`
                }, body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`)
            }
            const responseData = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    return (<Paper sx={{height: '100vh'}}>
        <PageTitle label={'Editar Consultor Automotivo'}/>
        <Header title={'Editar Consultor Automotivo'}/>

        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box
                component='form'
                onSubmit={formik.handleSubmit}
                maxWidth={1500}
                sx={{
                    backgroundColor: '#2F2F2F', padding: 2, border: 1
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                            name='name'
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            fullWidth
                            label='Email'
                            margin='normal'
                            size='small'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                            name='email'
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
                            value={formik.values.tradingName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tradingName && formik.errors.tradingName}
                            helperText={formik.touched.tradingName && formik.errors.tradingName}
                            name='tradingName'
                            InputLabelProps={{shrink: true}}
                        />
                        <CityInput
                            sx={{marginTop: 2}}
                            value={carHunterData.city}
                            onChange={(event, newValue) => setSelectedCity(newValue)}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={formik.values.isActive || false}
                                onChange={formik.handleChange}
                                name='isActive'
                            />}
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
                            value={formik.values.socialMedia.facebookUrl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.socialMedia && formik.touched.socialMedia.facebookUrl && formik.errors.socialMedia && formik.errors.socialMedia.facebookUrl}
                            helperText={formik.touched.socialMedia && formik.touched.socialMedia.facebookUrl && formik.errors.socialMedia && formik.errors.socialMedia.facebookUrl}
                            name='socialMedia.facebookUrl'
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Instagram'
                            size='small'
                            value={formik.values.socialMedia.instagramUrl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.socialMedia && formik.touched.socialMedia.instagramUrl && formik.errors.socialMedia && formik.errors.socialMedia.instagramUrl}
                            helperText={formik.touched.socialMedia && formik.touched.socialMedia.instagramUrl && formik.errors.socialMedia && formik.errors.socialMedia.instagramUrl}
                            name='socialMedia.instagramUrl'
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    {/* Fim inputs dos dados das redes sociais */}

                    <Grid item xs={12}>
                        <Typography variant='h6'>Telefones</Typography>
                    </Grid>

                    {/* Inicio inputs dos telefones */}
                    {phones.map((phone, index) => (<Grid item xs key={index}>
                        <PatternFormat
                            fullWidth
                            size='small'
                            value={formatPhoneNumber(phone.areaCode, phone.number)}
                            onChange={event => handlePhoneChange(event, index)}
                            customInput={TextField}
                            format='(##) #####-####'
                            id='phone'
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={phone.isWhatsapp || false}
                                onChange={event => handleWhatsAppChange(event, index)}
                            />}
                            label='É Whastapp'
                        />
                    </Grid>))}
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
                            value={formik.values.serviceRange.searchRadius}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceRange && formik.touched.serviceRange.searchRadius && formik.errors.serviceRange && formik.errors.serviceRange.searchRadius}
                            name='serviceRange.searchRadius'
                            endAdornment={<InputAdornment position='end'>km</InputAdornment>}
                        />
                        <FormHelperText>Área de cobertura</FormHelperText>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Year MIN'
                            size='small'
                            value={formik.values.serviceRange.yearMin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceRange && formik.touched.serviceRange.yearMin && formik.errors.serviceRange && formik.errors.serviceRange.yearMin}
                            name='serviceRange.yearMin'
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Year MAX'
                            size='small'
                            value={formik.values.serviceRange.yearMax}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceRange && formik.touched.serviceRange.yearMax && formik.errors.serviceRange && formik.errors.serviceRange.yearMax}
                            disabled={formik.values.serviceRange.brandNew}
                            name='serviceRange.yearMax'
                            InputLabelProps={{shrink: true}}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={formik.values.serviceRange.brandNew || false}
                                onChange={formik.handleChange}
                                name='serviceRange.brandNew'
                            />}
                            label='0km'
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Price MIN'
                            size='small'
                            value={formik.values.serviceRange.priceMin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceRange && formik.touched.serviceRange.priceMin && formik.errors.serviceRange && formik.errors.serviceRange.priceMin}
                            name='serviceRange.priceMin'
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Price MAX'
                            size='small'
                            value={formik.values.serviceRange.priceMax}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceRange && formik.touched.serviceRange.priceMax && formik.errors.serviceRange && formik.errors.serviceRange.priceMax}
                            name='serviceRange.priceMax'
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
                            rows={6}
                            InputLabelProps={{shrink: true}}
                            value={formik.values.serviceDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.serviceDescription && formik.errors.serviceDescription}
                            helperText={formik.touched.serviceDescription && formik.errors.serviceDescription}
                            name='serviceDescription'
                        />
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Button variant='contained' type='submit'>
                        Salvar
                    </Button>
                </Grid>
            </Box>
        </Box>
    </Paper>)
}

export const getServerSideProps = async ctx => {
    const cookies = parseCookies(ctx)
    const token = cookies.token

    if (!token) {
        return {
            redirect: {
                destination: '/auth/login', permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
