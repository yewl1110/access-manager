import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { RecoilRoot } from 'recoil'
import PageContainer from './PageContainer'

dayjs.extend(utc)
dayjs.extend(timezone)

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecoilRoot>
        <PageContainer />
      </RecoilRoot>
    </LocalizationProvider>
  )
}
