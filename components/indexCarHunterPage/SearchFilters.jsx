import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
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
import {useEffect} from "react";
import {fetchCity} from "../../services/actions/fetchCity";
import {fetchIndexCarhunters} from "../../services/actions/fetchCarhunter";
import {NumericFormat} from "react-number-format";

export default function SearchFilters({city, filters, setFilters, setTotalPages, setCarHunters, handleReset}) {
    const currentYear = new Date().getFullYear() + 1;
    const years = Array.from({length: currentYear - 1949}, (_, i) => 1950 + i);

    useEffect(() => {
        if (city) {
            fetchCity(city).then((result) => {
                setFilters((prevFilters) => ({
                    ...prevFilters, city: result,
                }))
            })

        }
    }, [city]);

    const handleSearch = () => {
        fetchIndexCarhunters(filters).then((result) => {
            setTotalPages(result.totalPages);
            setCarHunters(result.content);
        });
    }

    useEffect(() => {
        handleSearch()
    }, [filters.city, filters.page]);

    return (
        <>
            <Box sx={{border: 1, backgroundColor: '#1e2224', p: 3}}>
                <Typography variant='h6' align='center' sx={{fontWeight: 'light', fontSize: '16px', mb: 2}}>
                    Filtros de pesquisa
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Nome'
                            fullWidth
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Nome Consultoria'
                            fullWidth
                            value={filters.tradingName}
                            onChange={event => setFilters({...filters, tradingName: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CityInput value={filters.city}
                                   onChange={(event, newValue) => setFilters({...filters, city: newValue})}/>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel size={'small'} sx={{mb: 1}}>Área de cobertura</InputLabel>
                            <OutlinedInput
                                fullWidth
                                label={'Área de cobertura'}
                                size='small'
                                value={filters.serviceRange.searchRadius}
                                onChange={(event) => {
                                    const newFilters = {...filters};
                                    newFilters.serviceRange = {...newFilters.serviceRange};
                                    newFilters.serviceRange.searchRadius = event.target.value;
                                    setFilters(newFilters);
                                }}
                                endAdornment={<InputAdornment position='end'>km</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <NumericFormat
                            size='small'
                            label='Preço mínimo'
                            value={filters.serviceRange.priceMin}
                            onChange={(values) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.priceMin = values.target.value;
                                setFilters(newFilters);
                            }}
                            customInput={TextField}
                            thousandSeparator='.'
                            prefix={'R$'}
                            suffix=',00'
                            decimalSeparator=','
                            placeholder='R$'
                            fixedDecimalScale={true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <NumericFormat
                            size='small'
                            label='Preço máximo'
                            value={filters.serviceRange.priceMax}
                            onChange={(values) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.priceMax = values.target.value;
                                setFilters(newFilters);
                            }}
                            customInput={TextField}
                            thousandSeparator='.'
                            prefix={'R$'}
                            suffix=',00'
                            decimalSeparator=','
                            placeholder='R$'
                            fixedDecimalScale={true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl size='small' style={{width: '100%'}}>
                            <InputLabel>Do ano</InputLabel>
                            <Select
                                value={filters.serviceRange.yearMin}
                                onChange={(event) => {
                                    const newFilters = {...filters};
                                    newFilters.serviceRange = {...newFilters.serviceRange};
                                    newFilters.serviceRange.yearMin = event.target.value;
                                    setFilters(newFilters);
                                }}
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
                    <Grid item xs={6}>
                        <FormControl size="small" style={{width: '100%'}}>
                            <InputLabel>Até ano</InputLabel>
                            <Select
                                value={filters.serviceRange.yearMax}
                                onChange={(event) => {
                                    const newFilters = {...filters};
                                    newFilters.serviceRange = {...newFilters.serviceRange};
                                    newFilters.serviceRange.yearMax = event.target.value;
                                    newFilters.serviceRange.brandNew = false;
                                    setFilters(newFilters);
                                }}
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
                            control={
                                <Checkbox
                                    checked={filters.serviceRange.brandNew}
                                    onChange={(event) => {
                                        const newFilters = {...filters};
                                        newFilters.serviceRange = {...newFilters.serviceRange};
                                        newFilters.serviceRange.brandNew = event.target.checked;
                                        if (event.target.checked) {
                                            newFilters.serviceRange.yearMax = '';
                                        }
                                        setFilters(newFilters);
                                    }}
                                />
                            }
                            label="0 Km"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            label="Descrição do serviço"
                            fullWidth
                            rows={6}
                            multiline
                            value={filters.serviceDescriptions}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceDescriptions = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                    </Grid>
                </Grid>

                <Button fullWidth variant='contained' onClick={handleSearch} sx={{mt: 2}}>
                    Pesquisar
                </Button>

                <Button fullWidth onClick={handleReset} sx={{mt: 1}}>
                    Limpar filtros
                </Button>
            </Box>
        </>
    )
}
