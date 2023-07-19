import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography
} from '@mui/material'

import Header from '../../components/header/Header'

export default function Dashboard () {
  return (
    <Paper sx={{ display: 'flex' }}>
      <Grid container>
        <Header />

        <Grid
          xs={3}
          container
          direction='column'
          justifyContent='space-between'
          alignItems='center'
          height={'100vh'}
        >
          <Grid item xs={6}>
            <Box border={2} borderColor={'#e37d7d'} width={250} height={250} />
          </Grid>
          <Grid item xs={6}>
            <Box border={2} borderColor={'#e37d7d'} width={250} height={250} />
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Box
            border={2}
            borderColor={'#f200ff'}
            width={'100vh'}
            height={'90vh'}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
