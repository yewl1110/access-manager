import Grid from '@mui/material/Unstable_Grid2'
import { Box, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddRuleDialog from './AddRuleDialog'
import { useEffect, useRef, useState } from 'react'
import SearchForm from './SearchForm'
import { useForm } from 'react-hook-form'
import { useYupValidationResolver } from '../hooks/useYupValidationResolver'
import { listSchema } from '../schema/schema'
import { listTableColumns } from '../dataGridMetadata'
import useLoading from '../hooks/useLoading'

export default function ListTable() {
  const [openModal, setOpenModal] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [rowsData, setRowsData] = useState(null)
  const { loading } = useLoading()
  const resolver = useYupValidationResolver(listSchema)
  const lastKey = useRef([])
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({ resolver, mode: 'all', defaultValues: { limit: 10 } })

  const submit = async (data, option) => {
    const response = await loading(() =>
      fetch(
        process.env.REACT_APP_API_URL +
          `/access-rule/list${option ? `/${option}` : ''}`,
        {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(data),
        }
      )
    )
    if (response.ok) {
      const data = await response.json()
      const [firstData] = data?.data.slice(0, 1)
      const [lastData] = data?.data.slice(-1)
      lastKey.current = [firstData?.key, lastData?.key]

      setRowsData(data)
    }
  }

  useEffect(() => {
    fetchCurrentPage()
  }, [])

  const resetTable = () => {
    setPaginationModel({ ...paginationModel, page: 0 })
    setValue('searchMemo', null)
    setValue('searchPeriod', null)
    setValue('searchOption', '')
    fetchCurrentPage()
  }
  const fetchCurrentPage = (...restParam) => {
    handleSubmit((data) => submit(data, ...restParam))()
  }

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
              resetTable={resetTable}
              submit={() => {
                setPaginationModel({ ...paginationModel, page: 0 })
                fetchCurrentPage()
              }}
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
              rows={rowsData?.data ?? []}
              columns={listTableColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              onPaginationModelChange={(model) => {
                const isNext = paginationModel.page < model.page
                const [prevKey, nextKey] = lastKey.current
                setValue('lastKey', isNext ? nextKey : prevKey)
                setPaginationModel(model)
                if (model.page > 0) {
                  fetchCurrentPage(isNext ? 'next' : 'prev')
                } else {
                  fetchCurrentPage()
                }
              }}
              paginationMode="server"
              paginationModel={paginationModel}
              rowCount={rowsData?.count ?? 0}
              sx={{
                '& .MuiDataGrid-overlayWrapper': { height: '100px' },
                '& .MuiDataGrid-virtualScrollerContent': {
                  overflowY: 'hidden',
                },
                '& .MuiDataGrid-scrollbar': { display: 'none' },
              }}
            />
          </Grid>
        </Paper>
      </Grid>
      {openModal && (
        <AddRuleDialog
          close={() => setOpenModal(false)}
          closeCallback={() => {
            if (paginationModel.page === 0) {
              fetchCurrentPage()
            }
          }}
        />
      )}
    </>
  )
}
