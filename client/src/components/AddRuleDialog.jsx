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

export default function AddRuleDialog({ close }) {
  return (
    <Dialog open={true}>
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
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <Box>
              <TextField label="차단 할 IP 주소" size="small" fullWidth />
            </Box>
          </Grid2>
          <Grid2 xs={12}>
            <Box>
              <TextField label="설명 (최대 20자)" size="small" fullWidth />
            </Box>
          </Grid2>
          <Grid2 xs={6}>
            <SmallDateTimePicker label="차단 시작 날짜" />
          </Grid2>
          <Grid2 xs={6}></Grid2>
          <Grid2 xs={6}>
            <SmallDateTimePicker label="차단 해제 날짜" />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button>추가</Button>
      </DialogActions>
    </Dialog>
  )
}
