import { Box, Grid, Paper, Typography } from '@mui/material'

import Header from '../../components/header/Header'
import DashBoardTable from '../../components/table/DashboardTable'

export default function Dashboard () {
  return (
    <Paper>
      <Box marginBottom={5}>
        <Header />
      </Box>

      <Grid container>
        {/* Inicio Barra Lateral com dados estatisticos */}
        <Grid
          item
          container
          xs={4}
          direction='column'
          justifyContent='space-between'
          alignItems='center'
          height={'100vh'}
        >
          <Grid item xs={6}>
            <Box border={2} borderColor={'#e37d7d'} width={250} height={250}>
              <Typography border={2} borderColor={'#e37d7d'} variant='h6'>
                574
              </Typography>
              <Typography border={2} borderColor={'#e37d7d'} variant='h6'>
                Consultores ativos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box border={2} borderColor={'#e37d7d'} width={250} height={250} />
          </Grid>
        </Grid>
        {/* Fim Barra Lateral com dados estatisticos */}

        <Grid item xs={7}>
          <DashBoardTable />
        </Grid>
      </Grid>
    </Paper>
  )
}
