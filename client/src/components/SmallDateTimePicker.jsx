import { FormHelperText, styled } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import React from 'react'
import dayjs from 'dayjs'

const CustomDateTimePicker = styled(DateTimePicker)(({ error }) => ({
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
  ...(error
    ? {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d32f2f !important',
        },
        '& .MuiInputBase-root': {
          ['&:hover']: {
            '& .MuiOutlinedInput-notchedOutline': {
              ...(error ? { borderColor: '#d32f2f' } : {}),
            },
          },
        },
        '& .MuiFormLabel-root.MuiInputLabel-root': {
          color: '#d32f2f',
        },
      }
    : {}),
}))

const SmallDateTimePicker = React.forwardRef(
  ({ error, helperText, setValue, ...props }, ref) => {
    return (
      <>
        <CustomDateTimePicker
          error={error}
          inputRef={ref}
          format={`YYYY-MM-DD hh:mm A [(${dayjs.tz.guess()})]`}
          onChange={(value) => {
            setValue(dayjs.utc(value).format())
          }}
          {...props}
        />
        {error && helperText && (
          <FormHelperText sx={{ color: '#d32f2f', m: '3px 14px 0' }}>
            {helperText}
          </FormHelperText>
        )}
      </>
    )
  }
)
export default SmallDateTimePicker
