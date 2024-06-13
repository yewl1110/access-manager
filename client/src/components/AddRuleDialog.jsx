import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import SmallDateTimePicker from './SmallDateTimePicker'
import { useYupValidationResolver } from '../hooks/useYupValidationResolver'
import { ruleSchema } from '../schema/schema'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

export default function AddRuleDialog({ close }) {
  const resolver = useYupValidationResolver(ruleSchema)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ resolver })

  const submit = (data) => {
    console.log(data)
  }

  const AddDayButton = ({ day }) => {
    return (
      <IconButton
        size="small"
        onClick={() => {
          const start = dayjs(watch('period.start'))
          setValue('period.end', start.add(day, 'day'))
        }}
      >
        {`+${day}D`}
      </IconButton>
    )
  }

  return (
    <Dialog open={true} maxWidth={'xs'}>
      <DialogTitle>규칙 추가</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Icon>close</Icon>
      </IconButton>
      <DialogContent dividers>
        <Grid2 container spacing={2} columns={1}>
          <Grid2 xs={1}>
            <Box>
              <TextField
                label="차단 할 IP 주소 ex) 100.10.1.1"
                size="small"
                error={!!errors['ip']}
                helperText={errors['ip']?.message}
                fullWidth
                max={15}
                inputProps={{ ...register('ip'), maxLength: 15 }}
              />
            </Box>
          </Grid2>
          <Grid2 xs={1}>
            <Box>
              <TextField
                label="설명 (최대 20자)"
                size="small"
                error={!!errors['memo']}
                helperText={errors['memo']?.message}
                fullWidth
                inputProps={{ ...register('memo'), maxLength: 20 }}
                onBlur={(event) => {
                  event.target.value = event.target.value.trim()
                }}
              />
            </Box>
          </Grid2>
          <Grid2 xs={1}>
            <SmallDateTimePicker
              label="차단 시작 날짜"
              error={!!errors['period.start']}
              helperText={errors['period.start']?.message}
              setValue={(value) => {
                setValue('period.start', value)
              }}
              value={
                (watch('period.start') && dayjs(watch('period.start'))) || null
              }
            />
            {watch('period.start') && (
              <>
                <AddDayButton day={1} />
                <AddDayButton day={3} />
                <AddDayButton day={7} />
              </>
            )}
          </Grid2>
          <Grid2 xs={1}>
            <SmallDateTimePicker
              label="차단 해제 날짜"
              error={!!errors['period.end']}
              helperText={errors['period.end']?.message}
              setValue={(value) => {
                setValue('period.end', value)
              }}
              value={
                (watch('period.end') && dayjs(watch('period.end'))) || null
              }
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(submit)}>추가</Button>
      </DialogActions>
    </Dialog>
  )
}
