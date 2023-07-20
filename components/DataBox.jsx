import { Box, Typography } from '@mui/material'

export default function DataBox ({ value, label, marginTop = 0 }) {
  return (
    <Box
      border={2}
      borderColor={'#e37d7d'}
      width={250}
      height={250}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      marginTop={marginTop}
    >
      <Typography variant='h2' textAlign={'center'}>
        {value}
      </Typography>
      <Typography variant='h5' textAlign={'center'}>
        {label}
      </Typography>
    </Box>
  )
}
