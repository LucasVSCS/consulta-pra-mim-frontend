import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'
import { SnackbarProvider } from 'notistack'

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
