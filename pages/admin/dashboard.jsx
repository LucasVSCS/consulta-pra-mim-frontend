import { Box, Paper } from '@mui/material'

import Header from '../../components/Header'
import DashBoardTable from '../../components/DashboardTable'
import DataBox from '../../components/DataBox'

export default function Dashboard () {
  return (
    <Paper sx={{ height: '100vh' }}>
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
          <DashBoardTable />
        </Box>
      </Box>
    </Paper>
  )
}
