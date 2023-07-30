import { Box } from '@mui/material'
import logoImage from '/public/images/logo.png'
import Image from 'next/image'

export default function LogoImage (props) {
  return (
    <Box sx={props.sx} onClick={props.onClick}>
      <Image src={logoImage} width={props.sx.width} height={props.sx.height} />
    </Box>
  )
}
