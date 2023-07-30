import { Container, Paper } from '@mui/material'
import { parseCookies } from 'nookies'

import Header from '../../components/Header'
import DashBoardTable from '../../components/DashboardTable'
import Head from 'next/head'

export default function Dashboard () {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchData = async (
    page,
    sort,
    order,
    rowsPerPage,
    status,
    cityId,
    name,
    tradingName
  ) => {
    const response = await fetch(
      `${apiUrl}/car-hunters?pageNo=${page}&sortBy=${sort}&sortOrder=${order}&pageSize=${rowsPerPage}&status=${status}&cityId=${cityId}&name=${name}&tradingName=${tradingName}`
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

      <Container>
        <DashBoardTable fetchData={fetchData} />
      </Container>
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
