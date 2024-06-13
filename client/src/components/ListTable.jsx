import Grid from '@mui/material/Unstable_Grid2'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddRuleDialog from './AddRuleDialog'
import { useState } from 'react'
import SmallDateTimePicker from './SmallDateTimePicker'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export default function ListTable() {
  const [openModal, setOpenModal] = useState(false)
  const [searchOption, setSearchOption] = useState('') // '' | 'memo' | 'period'

  return (
    <>
      <Grid
        spacing={2}
        container
        sx={{
          justifyContent: 'center',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Paper>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box sx={{ my: 'auto', mr: 1 }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  displayEmpty
                  value={searchOption}
                  onChange={(event) => {
                    setSearchOption(event.target.value)
                  }}
                >
                  <MenuItem value={''}>
                    <em>검색 조건</em>
                  </MenuItem>
                  <MenuItem value={'memo'}>내용 검색</MenuItem>
                  <MenuItem value={'period'}>기간 검색</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'row',
              }}
            >
              {searchOption === 'memo' && (
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="검색어"
                  size="small"
                />
              )}
              {searchOption === 'period' && <SmallDateTimePicker />}
              {searchOption && <Button>검색</Button>}
            </Box>
            <Box sx={{ my: 'auto', ml: 'auto' }}>
              <Button
                variant="outlined"
                sx={{ mr: 0.5 }}
                onClick={() => setSearchOption('')}
              >
                검색 옵션 초기화
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenModal(true)}
              >
                규칙 추가
              </Button>
            </Box>
          </Grid>
          <Grid>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Grid>
        </Paper>
      </Grid>
      {openModal && <AddRuleDialog close={() => setOpenModal(false)} />}
    </>
  )
}
