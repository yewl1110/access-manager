import { Container } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ListTable from './components/ListTable'

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="md"
        sx={{
          height: '100vh',
          display: 'flex',
          overflowY: 'hidden',
        }}
      >
        <ListTable />
      </Container>
    </LocalizationProvider>
  )
}
