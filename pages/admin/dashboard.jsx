import { Box, Paper } from '@mui/material'
import { parseCookies } from 'nookies'

import Header from '../../components/Header'
import DashBoardTable from '../../components/DashboardTable'
import DataBox from '../../components/DataBox'
import Head from 'next/head'

export default function Dashboard () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchData = async (page, sort, order, rowsPerPage) => {
    const response = await fetch(
      `${apiUrl}/car-hunters?page=${page}&sort=${sort}&order=${order}&size=${rowsPerPage}`
    )

    const data = await response.json()
    return {
      data: data.content,
      total: data.totalElements
    }
  }

  return (
    <Paper sx={{ height: '100vh' }}>
      <Head>
        <title>Painel Principal - Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title={'Painel Principal - Dashboard'} />

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

        <Box width='70%'>
          <DashBoardTable fetchData={fetchData} />
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
