import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Header from '../../components/Header'
import { useState } from 'react'

export default function EditCarHunter () {
  const [profilePicture, setProfilePicture] = useState(
    'https://i.pravatar.cc/300'
  )

  const handleProfilePictureChange = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = e => setProfilePicture(e.target.result)
      reader.readAsDataURL(event.target.files[0])
    }
  }
  return (
    <Paper sx={{ height: '100%' }}>
      <Header />

      <Box display='flex' flexDirection='column' alignItems='center'>
        <h2>Edit Automotive Consultant</h2>

        <Box component='form' maxWidth={800} marginBottom={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' marginBottom={1}>
                Personal Information
              </Typography>
              <Box border={2} borderColor={'#e37d7d'}>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleProfilePictureChange}
                  hidden
                  id='profile-picture-input'
                />
                <label htmlFor='profile-picture-input'>
                  <Avatar
                    src={profilePicture}
                    alt='Profile Picture'
                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                  />
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label='Name'
                margin='normal'
                variant='outlined'
              />
              <TextField
                fullWidth
                label='Consultant Name'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label='Email'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Cidade'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' marginBottom={1} marginTop={2}>
                Social Media
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Facebook'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Instagram'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' marginBottom={1} marginTop={2}>
                Phones
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Telefone 1'
                margin='normal'
                variant='outlined'
              />
              <FormControlLabel control={<Checkbox />} label='É Whastapp' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Telefone 2'
                margin='normal'
                variant='outlined'
              />
              <FormControlLabel control={<Checkbox />} label='É Whastapp' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' marginBottom={1} marginTop={2}>
                Service Range
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label='Search Radius'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label='Year MIN'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label='Year MAX'
                margin='normal'
                variant='outlined'
              />
              <FormControlLabel control={<Checkbox />} label='0km' />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label='Price MIN'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label='Price MAX'
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' marginBottom={1} marginTop={2}>
                Service Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Service Description'
                margin='normal'
                variant='outlined'
                multiline
                rows={4}
              />
              <FormControlLabel control={<Checkbox />} label='Usuário ativo' />
            </Grid>
          </Grid>
        </Box>
        <Button variant='contained' sx={{ marginBottom: 5 }}>
          Save
        </Button>
      </Box>
    </Paper>
  )
}
