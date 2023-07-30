import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function BackButton (props) {
  const router = useRouter()

  return (
    <Button
      startIcon={<ArrowBack />}
      sx={{
        padding: '10px 22px',
        height: 45,
        border: '1px solid white',
        color: 'white',
        ...props.sx
      }}
      onClick={() => router.back()}
    >
      Voltar
    </Button>
  )
}
