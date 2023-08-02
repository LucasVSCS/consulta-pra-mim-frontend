import {Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import CityInput from "../CityInput";
import {useEffect} from "react";
import {fetchCity} from "../../services/actions/fetchCity";
import {fetchIndexCarhunters} from "../../services/actions/fetchCarhunter";

export default function SearchFilters({city, filters, setFilters, setTotalPages, setCarHunters, handleSearchClick}) {
    useEffect(() => {
        if (city) {
            fetchCity(city).then((result) => {
                setFilters((prevFilters) => ({
                    ...prevFilters, city: result,
                }));
            })
        }
    }, [city]);

    useEffect(() => {
        fetchIndexCarhunters(filters).then((result) => {
            setTotalPages(result.totalPages);
            setCarHunters(result.content);
        });
    }, [
        filters.page,
        filters.status,
        filters.city,
        filters.name,
        filters.tradingName,
        filters.serviceRange.searchRadius,
        filters.serviceRange.priceMin,
        filters.serviceRange.priceMax,
        filters.serviceRange.yearMin,
        filters.serviceRange.yearMax,
        filters.serviceRange.brandNew,
        filters.serviceDescriptions,
    ]);

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
                        <CityInput
                            value={filters.city}
                            onChange={(event, newValue) => setFilters({...filters, city: newValue})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Área de cobertura'
                            fullWidth
                            value={filters.serviceRange.searchRadius}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.searchRadius = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            label="Preço minimo"
                            value={filters.serviceRange.priceMin}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.priceMin = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            label="Preço máximo"
                            value={filters.serviceRange.priceMax}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.priceMax = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            label="Ano minimo"
                            value={filters.serviceRange.yearMin}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.yearMin = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            label="Ano maximo"
                            value={filters.serviceRange.yearMax}
                            onChange={(event) => {
                                const newFilters = {...filters};
                                newFilters.serviceRange = {...newFilters.serviceRange};
                                newFilters.serviceRange.yearMax = event.target.value;
                                setFilters(newFilters);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.serviceRange.brandNew}
                                    onChange={(event) => {
                                        const newFilters = {...filters};
                                        newFilters.serviceRange = {...newFilters.serviceRange};
                                        newFilters.serviceRange.brandNew = event.target.checked;
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

                <Button fullWidth variant='contained' onClick={handleSearchClick} sx={{mt: 2}}>
                    Pesquisar
                </Button>
            </Box>
        </>
    )
}
