import {Box, Button, Grid, Pagination, Paper, Typography} from '@mui/material'
import Header from '../../components/Header'
import {useEffect, useState} from 'react'
import PageTitle from '../../components/PageTitle'
import {useRouter} from 'next/router'
import SearchFilters from "../../components/indexCarHunterPage/SearchFilters";
import {fetchIndexCarhunters} from "../../services/actions/fetchCarhunter";
import {fetchCity} from "../../services/actions/fetchCity";

export default function CarHunterSearchPage() {
    const router = useRouter()
    const initialFilters = {
        status: 1,
        city: '',
        name: '',
        tradingName: '',
        serviceRange: {searchRadius: '', priceMin: '', priceMax: '', yearMin: '', yearMax: '', brandNew: false},
        serviceDescriptions: '',
        page: 0,
        rowsPerPage: 12
    }

    const [carHunters, setCarHunters] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [filters, setFilters] = useState(initialFilters)

    const setCurrentPage = (event, value) => {
        setFilters({...filters, page: --value})
    }

    const handleMoreInfoClick = carHunterId => {
        router.push(`/car-hunter/${carHunterId}`)
    }

    const handleReset = () => {
        setFilters(initialFilters)
        fetchIndexCarhunters(initialFilters).then((result) => {
            setTotalPages(result.totalPages);
            setCarHunters(result.content);
        });
    }

    const handleSearch = () => {
        fetchIndexCarhunters(filters).then((result) => {
            setTotalPages(result.totalPages);
            setCarHunters(result.content);
        });
    }

    useEffect(() => {
        if (router.query.cityId) {
            fetchCity(router.query.cityId).then((result) => {
                setFilters((prevFilters) => ({
                    ...prevFilters, city: result,
                }))
            })

        }
    }, [router.query.cityId])

    useEffect(() => {
        if (router.query.cityId && filters.city) {
            handleSearch()
        }
    }, [filters.city])

    useEffect(() => {
        handleSearch()
    }, [filters.page])

    const links = [{name: 'Pesquisar Consultores', url: ''}, {name: 'Torne-se um Consultor', url: '/car-hunter/signup'}]

    return (
        <Paper sx={{height: "100vh", overflowY: "hidden"}}>
            <PageTitle label={"Pesquisar Consultores"}/>
            <Header logoUrlRedirect={"/"} links={links} isUserLogged={false}/>

            <Box sx={{display: "flex", padding: 2, height: "100%", boxSizing: "border-box"}}>
                <Grid container>
                    <Grid item xs={2}>
                        <SearchFilters
                            filters={filters}
                            setFilters={setFilters}
                            handleReset={handleReset}
                            handleSearch={handleSearch}
                        />
                    </Grid>

                    <Grid item xs={10}>
                        <Box sx={{p: 2}}>
                            {carHunters && carHunters.length === 0 ? (
                                <Typography variant="h6" align="center">Nenhum resultado encontrado</Typography>) : (
                                <Grid container spacing={2} sx={{minHeight: "65vh"}}>
                                    {carHunters && carHunters.map((carHunter) => (
                                        <Grid item xs={2} key={carHunter.externalId}>
                                            <Box
                                                sx={{
                                                    maxHeight: 260,
                                                    minHeight: 260,
                                                    bgcolor: "grey.800",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: 1,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 190,
                                                        height: 190,
                                                        cursor: 'pointer',
                                                        marginBottom: 8,
                                                        marginTop: 8,
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
                                                <Typography align="center">{carHunter.tradingName}</Typography>
                                                <Typography
                                                    align="center">{`${carHunter.city.name} - ${carHunter.city.ufCode}`}</Typography>
                                            </Box>
                                            <Button variant="contained" fullWidth
                                                    onClick={() => handleMoreInfoClick(carHunter.externalId)}>
                                                Mais informações
                                            </Button>
                                        </Grid>))}
                                </Grid>)}
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "center", mt: "auto"}}>
                            <Pagination variant="outlined" shape="rounded" count={totalPages} page={filters.page + 1}
                                        onChange={(event, page) => setCurrentPage(event, page)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
