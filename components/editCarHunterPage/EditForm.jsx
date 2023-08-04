import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import CityInput from "../CityInput";
import {NumericFormat, PatternFormat} from "react-number-format";
import {formatPhoneNumber, handlePhoneChange, handleWhatsAppChange} from "../../services/utils/PhoneUtils";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {EditCarHunterSchema} from "../../services/validations/EditCarHunterSchema";
import {parseCookies} from "nookies";
import {updateCarhunter} from "../../services/actions/updateCarhunter";
import {fetchCarhunter} from "../../services/actions/fetchCarhunter";
import {enqueueSnackbar} from "notistack";

export default function EditForm() {
    const router = useRouter()
    const currentYear = new Date().getFullYear() + 1;
    const years = Array.from({length: currentYear - 1949}, (_, i) => 1950 + i);
    const {externalId} = router.query
    const [carHunterData, setCarHunterData] = useState({})
    const [phones, setPhones] = useState([{}, {}])
    const [phone, setPhone] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)

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
        }, validationSchema: EditCarHunterSchema, onSubmit: async values => {
            const cookies = parseCookies();
            const token = cookies.token;

            const formattedValues = {
                ...values,
                serviceRange: {
                    ...values.serviceRange,
                    priceMin: values.serviceRange.priceMin ? values.serviceRange.priceMin.toString().replace(/\D/g, '') : '',
                    priceMax: values.serviceRange.priceMax ? values.serviceRange.priceMax.toString().replace(/\D/g, '') : '',
                }
            }

            updateCarhunter(externalId, formattedValues, token).then((response) => {
                if (response.success) {
                    return enqueueSnackbar(`Sucesso ao editar o consultor - ${carHunterData.name}`, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }
                    })
                }

                return enqueueSnackbar('Erro ao editar o consultor - Dados Inválidos', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            })
        }
    });

    useEffect(() => {
        formik.setValues({
            name: carHunterData.name || '',
            tradingName: carHunterData.tradingName || '',
            email: carHunterData.email || '',
            cityId: carHunterData.city ? carHunterData.city.id : '',
            logoImage: carHunterData.logoUrl || '',
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
            setCarHunterData(prevCarHunterData => {
                const newCarHunterData = {...prevCarHunterData}
                newCarHunterData.city = {
                    id: selectedCity.id, name: selectedCity.name, ufCode: selectedCity.ufCode
                }
                return newCarHunterData
            })
        }
    }, [selectedCity])

    useEffect(() => {
        if (carHunterData.phones && carHunterData.phones.length) {
            setPhones(carHunterData.phones)
        }
    }, [carHunterData.phones])

    useEffect(() => {
        if (!externalId) return

        fetchCarhunter(externalId).then(data => {
            setCarHunterData(data)
        })
    }, [externalId])

    const handleProfilePictureChange = event => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader()
            reader.onload = e => setCarHunterData(prevCarHunterData => {
                const newCarHunterData = {...prevCarHunterData}
                newCarHunterData.logoUrl = e.target.result
                return newCarHunterData
            })
            reader.readAsDataURL(event.target.files[0])
        }
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box component='form' onSubmit={formik.handleSubmit} maxWidth={1500}
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
                                name='logoImage'
                                type='file'
                                accept='image/*'
                                onChange={handleProfilePictureChange}
                                hidden
                                id='profile-picture-input'
                            />
                            <label htmlFor='profile-picture-input'>
                                <div style={{width: 150, height: 150, cursor: 'pointer'}}>
                                    <img src={carHunterData.logoUrl} alt='Profile Picture'
                                         style={{
                                             maxWidth: '100%',
                                             maxHeight: '100%',
                                             objectFit: 'contain'
                                         }}
                                    />
                                </div>
                            </label>
                        </Box>
                    </Grid>

                    {/* Inicio inputs dos dados do Consultor */}
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Nome'
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
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label='Nome Consultoria'
                            margin='normal'
                            size='small'
                            variant='outlined'
                            value={formik.values.tradingName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.tradingName && formik.errors.tradingName}
                            helperText={formik.touched.tradingName && formik.errors.tradingName}
                            name='tradingName'
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
                    {phones.map((phone, index) => (
                        <Grid item xs key={index}>
                            <PatternFormat
                                fullWidth
                                size='small'
                                value={formatPhoneNumber(phone.areaCode, phone.number)}
                                onChange={event => handlePhoneChange(event, index, setPhone, setPhones)}
                                customInput={TextField}
                                format='(##) #####-####'
                                id='phone'
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={phone.isWhatsapp || false}
                                    onChange={event => handleWhatsAppChange(event, index, setPhones)}
                                    disabled={!phone.areaCode || !phone.number}
                                />}
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
                        <FormControl size='small' style={{width: '100%'}}>
                            <InputLabel>Do ano</InputLabel>
                            <Select
                                value={formik.values.serviceRange.yearMin}
                                onChange={formik.handleChange}
                                name='serviceRange.yearMin'
                                InputLabelProps={{shrink: true}}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    getContentAnchorEl: null,
                                    PaperProps: {
                                        style: {
                                            maxHeight: 48 * 4.5,
                                        },
                                    },
                                }}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl size="small" style={{width: '100%'}}>
                            <InputLabel>Até ano</InputLabel>
                            <Select
                                value={formik.values.serviceRange.yearMax}
                                onChange={formik.handleChange}
                                disabled={formik.values.serviceRange.brandNew}
                                name='serviceRange.yearMax'
                                InputLabelProps={{shrink: true}}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    getContentAnchorEl: null,
                                    PaperProps: {
                                        style: {
                                            maxHeight: 48 * 4.5,
                                        },
                                    },
                                }}
                            >
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        <NumericFormat
                            fullWidth
                            size='small'
                            label='Preço mínimo'
                            value={formik.values.serviceRange.priceMin}
                            onChange={formik.handleChange}
                            customInput={TextField}
                            thousandSeparator='.'
                            prefix={'R$'}
                            suffix=''
                            decimalSeparator=','
                            placeholder='R$'
                            fixedDecimalScale={true}
                            InputLabelProps={{shrink: true}}
                            name='serviceRange.priceMin'
                        />
                    </Grid>
                    <Grid item xs>
                        <NumericFormat
                            fullWidth
                            size='small'
                            label='Preço máximo'
                            value={formik.values.serviceRange.priceMax}
                            onChange={formik.handleChange}
                            customInput={TextField}
                            thousandSeparator='.'
                            prefix={'R$'}
                            suffix=''
                            decimalSeparator=','
                            placeholder='R$'
                            fixedDecimalScale={true}
                            InputLabelProps={{shrink: true}}
                            name='serviceRange.priceMax'
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
                    <Button fullWidth variant='contained' type='submit'>
                        Salvar
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}
