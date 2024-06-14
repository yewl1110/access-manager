import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Container,
} from '@mui/material'
import ListTable from './components/ListTable'
import { useRecoilValue } from 'recoil'
import { alertState } from './hooks/useAlert'
import { backdropState } from './hooks/useLoading'

export default function PageContainer() {
  const alert = useRecoilValue(alertState)
  const isLoading = useRecoilValue(backdropState)
  return (
    <Container
      maxWidth="lg"
      fixed
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {alert && (
        <Alert
          severity={alert.severity}
          sx={{
            position: 'absolute',
            top: '20px',
            zIndex: 9999,
            animation: 'slideDown 0.5s ease-out',
          }}
        >
          {alert.message}
        </Alert>
      )}
      {isLoading && (
        <Backdrop
          sx={{
            zIndex: 9998,
          }}
          invisible
          open={true}
        >
          <CircularProgress color="info" />
        </Backdrop>
      )}
      <Box>
        <ListTable />
      </Box>
    </Container>
  )
}
