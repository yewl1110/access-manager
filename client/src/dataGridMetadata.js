import { Box, Button } from '@mui/material'
import { utcToLocalTimezone } from './timeutil'

const defaultColumnsOption = {
  disableColumnMenu: true,
  filterable: false,
  resizable: false,
  sortable: false,
  headerAlign: 'center',
  cellClassName: 'data-grid-cell',
  disableColumnFilter: true,
}

export const listTableColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    align: 'center',
  },
  {
    field: 'ip',
    headerName: 'IP 주소',
    width: 160,
    align: 'center',
  },
  {
    field: 'memo',
    headerName: '내용',
    width: 400,
  },
  {
    field: 'start',
    headerName: '차단 시작 날짜',
    width: 180,
    align: 'center',
    valueFormatter: (value) => utcToLocalTimezone(value),
  },
  {
    field: 'end',
    headerName: '차단 해제 날짜',
    width: 180,
    align: 'center',
    valueFormatter: (value) => utcToLocalTimezone(value),
  },
  {
    field: 'remove',
    headerName: '',
    renderCell: ({ value }) => (
      <Box sx={{ p: 0.5 }}>
        <Button variant={'contained'} color={'error'} size={'small'}>
          삭제
        </Button>
      </Box>
    ),
    align: 'center',
  },
].map((c) => ({ ...c, ...defaultColumnsOption }))
