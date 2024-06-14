import { Box, Container } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ListTable from './components/ListTable'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="lg"
        fixed
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box>
          <ListTable />
        </Box>
      </Container>
    </LocalizationProvider>
  )
}
