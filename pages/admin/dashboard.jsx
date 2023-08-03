import {Container, Paper} from '@mui/material'

import Header from '../../components/Header'
import DashBoardTable from '../../components/DashboardTable'
import PageTitle from '../../components/PageTitle'
import {getUserToken} from "../../services/utils/AuthUtils";
import {fetchPaginatedCarhunters} from "../../services/actions/fetchCarhunter";

export default function Dashboard({userName}) {
    const links = [
        {name: 'Página Inicial', url: '/'},
        {name: 'Dashboard - Lista Consultores', url: '/admin/dashboard'},
    ]

    return (
        <Paper sx={{height: '100vh'}}>
            <PageTitle label={'Painel Principal - Dashboard'}/>
            <Header userName={userName} logoUrlRedirect={'/admin/dashboard'} links={links}/>

            <Container>
                <DashBoardTable fetchData={fetchPaginatedCarhunters}/>
            </Container>
        </Paper>
    )
}

export const getServerSideProps = async ctx => {
    const userToken = getUserToken(ctx)

    if (!userToken) {
        return {
            redirect: {
                destination: '/auth/login', permanent: false
            }
        }
    }

    const payload = userToken.split('.')[1];
    const userName = JSON.parse(atob(payload)).sub;

    return {
        props: {
            userName
        }
    }
}
