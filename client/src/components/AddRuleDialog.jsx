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
import useLoading from '../hooks/useLoading'
import useAlert from '../hooks/useAlert'

export default function AddRuleDialog({ close, closeCallback }) {
  const resolver = useYupValidationResolver(ruleSchema)
  const { loading } = useLoading()
  const { alert } = useAlert()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({ resolver, mode: 'all' })

  const submit = async (data) => {
    const response = await loading(() =>
      fetch(process.env.REACT_APP_API_URL + '/access-rule', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data),
      })
    )
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        alert({ message: '규칙을 추가했습니다.', severity: 'success' })
        closeCallback()
        close()
      } else {
        alert({ message: data.message, severity: 'error' })
      }
    }
  }

  const AddDayButton = ({ day }) => {
    return (
      <IconButton
        size="small"
        onClick={() => {
          const start = dayjs(watch('period.start'))
          setValue('period.end', dayjs.utc(start.add(day, 'day')).format())
        }}
      >
        {`+${day}D`}
      </IconButton>
    )
  }

  const getIP = async () => {
    const response = await loading(() =>
      fetch(process.env.REACT_APP_API_URL + '/ip', {
        method: 'GET',
      })
    )
    if (response.ok) {
      const ip = await response.text()
      setValue('ip', ip)
      setFocus('ip')
    }
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
        <Grid2 container spacing={2} columns={4}>
          <Grid2 xs={3}>
            <Box>
              <TextField
                label="차단 할 IP 주소 ex) 100.10.1.1"
                size="small"
                error={!!errors['ip']}
                helperText={errors['ip']?.message}
                fullWidth
                max={15}
                inputProps={{
                  ...register('ip'),
                  maxLength: 15,
                }}
                InputLabelProps={{ shrink: !!watch('ip') }}
              />
            </Box>
          </Grid2>
          <Grid2
            xs={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Button
                size={'small'}
                variant="outlined"
                onClick={() => {
                  getIP()
                }}
              >
                내 IP 등록
              </Button>
            </Box>
          </Grid2>
          <Grid2 xs={4}>
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
          <Grid2 xs={4}>
            <SmallDateTimePicker
              label="차단 시작 날짜"
              error={!!errors['period.start']}
              helperText={errors['period.start']?.message}
              showTimezone
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
          <Grid2 xs={4}>
            <SmallDateTimePicker
              label="차단 해제 날짜"
              error={!!errors['period.end']}
              helperText={errors['period.end']?.message}
              showTimezone
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
