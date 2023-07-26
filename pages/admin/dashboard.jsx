import { Box, Paper } from '@mui/material'
import { parseCookies } from 'nookies'

import Header from '../../components/Header'
import DashBoardTable from '../../components/DashboardTable'
import DataBox from '../../components/DataBox'
import Head from 'next/head'

export default function Dashboard ({ data }) {
  return (
    <Paper sx={{ height: '100vh' }}>
      <Head>
        <title>Painel Principal - Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title={'Painel Principal - Dashboard'} />

      {/* Start Sidebar with statistical data */}
      <Box display='flex'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          width='20%'
        >
          <DataBox value={'574'} label={'Consultores ativos'} />

          <DataBox
            value={'574'}
            label={'Consultores pendentes de aprovação'}
            marginTop={25}
          />
        </Box>
        {/* End Sidebar with statistical data */}

        <Box width='70%'>
          <DashBoardTable data={data} />
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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${apiUrl}/car-hunters`)
  const data = await response.json()

  console.log(data)

  return {
    props: {
      data: data.content
    }
  }
}
