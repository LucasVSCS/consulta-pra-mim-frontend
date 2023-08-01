import {Box, Container, Paper, Typography} from '@mui/material'
import Header from '../../../components/Header'
import PageTitle from '../../../components/PageTitle'
import {getUserToken} from "../../../services/utils/AuthUtils";
import EditForm from "../../../components/editCarHunterPage/EditForm";
import BackButton from "../../../components/BackButton";

export default function EditCarHunter() {
    const links = [
        {name: 'Página Inicial', url: '/'},
        {name: 'Dashboard - Lista Consultores', url: '/admin/dashboard'},
    ]

    return (
        <Paper sx={{height: '100vh'}}>
            <PageTitle label={'Editar Consultor Automotivo'}/>
            <Header logoUrlRedirect={'/admin/dashboard'} links={links}/>
            <Container>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <BackButton sx={{mb: 2}}/>
                    <Typography variant={"h5"}>Editar Consultor</Typography>
                    <div></div>
                </Box>
                <EditForm/>
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

    return {
        props: {}
    }
}
