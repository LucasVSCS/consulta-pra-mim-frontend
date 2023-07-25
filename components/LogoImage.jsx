import { Box } from '@mui/material'
import logoImage from '/public/images/logo.png'
import Image from 'next/image'

export default function LogoImage (props) {
  return (
    <Box mb={props.marginBottom}>
      <Image src={logoImage} width={props.width} height={props.height} />
    </Box>
  )
}
