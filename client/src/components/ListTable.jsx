import Grid from '@mui/material/Unstable_Grid2'
import { Box, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddRuleDialog from './AddRuleDialog'
import { useEffect, useState } from 'react'
import SearchForm from './SearchForm'
import { useForm } from 'react-hook-form'
import { useYupValidationResolver } from '../hooks/useYupValidationResolver'
import { listSchema } from '../schema/schema'
import { listTableColumns } from '../dataGridMetadata'

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
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [rows, setRows] = useState([])
  const resolver = useYupValidationResolver(listSchema)
  const {
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({ resolver, mode: 'all', defaultValues: { limit: 10 } })

  const submit = async (data) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + '/access-rule/list',
      {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(data),
      }
    )
    if (response.ok) {
      const data = await response.json()
      setRows(data)
    }
  }

  useEffect(() => {
    const [lastData] = rows.slice(-1)
    setValue('lastKey', lastData?.key)
  }, [rows])

  useEffect(() => {
    handleSubmit(submit, console.log)()
  }, [])

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
        <Paper sx={{ flexShrink: 0 }}>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <SearchForm
              submit={handleSubmit(submit)}
              setSubmitParam={setValue}
              resetSubmitParam={resetField}
            />
            <Box sx={{ my: 'auto' }}>
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
              columns={listTableColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              onPaginationModelChange={(model) => {
                const isNext = paginationModel.page < model.page
                setPaginationModel(model)
                console.log('isNext' + isNext)
                handleSubmit(submit, console.log)()
              }}
              paginationMode="server"
              paginationModel={paginationModel}
              rowCount={100}
              sx={{
                '& .MuiDataGrid-overlayWrapper': { height: '100px' },
                '& .MuiDataGrid-virtualScrollerContent': {
                  overflowY: 'hidden',
                },
              }}
            />
          </Grid>
        </Paper>
      </Grid>
      {openModal && <AddRuleDialog close={() => setOpenModal(false)} />}
    </>
  )
}
