import { styled } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'

const CustomDateTimePicker = styled(DateTimePicker)(() => ({
  '&': {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    paddingTop: '8.5px',
    paddingBottom: '8.5px',
  },
  '& .MuiFormLabel-root.MuiInputLabel-root[data-shrink="false"]': {
    transform: 'translate(14px, 8.5px) scale(1)',
  },
}))

export default function SmallDateTimePicker(props) {
  return <CustomDateTimePicker {...props} />
}
