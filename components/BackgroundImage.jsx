import { Box } from '@mui/material'
import Image from 'next/image'

export default function BackgroundImage (props) {
  return (
    <Box sx={props.sx}>
      <Image
        src={props.image}
        layout='fill'
        objectFit='cover'
        alt='Background Image'
      />
    </Box>
  )
}
