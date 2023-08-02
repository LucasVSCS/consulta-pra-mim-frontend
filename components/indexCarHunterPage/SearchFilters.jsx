import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import CityInput from "../CityInput";

export default function SearchFilters({filters, setFilters, handleSearchClick}) {
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
                            onChange={(event, newValue) =>
                                setFilters({...filters, city: newValue})
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Área de cobertura'
                            fullWidth
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small'
                            label='Ano minimo'
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small'
                            label='Ano maximo'
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small'
                            label='Preço minimo'
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small'
                            label='Preço máximo'
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            label='Descrição do serviço'
                            fullWidth
                            rows={6}
                            multiline
                            value={filters.name}
                            onChange={event => setFilters({...filters, name: event.target.value})}
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
