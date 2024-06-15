import Grid from '@mui/material/Unstable_Grid2'
import { Box, Button, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddRuleDialog from './AddRuleDialog'
import { useEffect, useMemo, useRef, useState } from 'react'
import SearchForm from './SearchForm'
import { useForm } from 'react-hook-form'
import { useYupValidationResolver } from '../hooks/useYupValidationResolver'
import { listSchema } from '../schema/schema'
import { listTableColumns } from '../dataGridMetadata'
import useLoading from '../hooks/useLoading'
import useAlert from '../hooks/useAlert'

export default function ListTable() {
  const [openModal, setOpenModal] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [rowsData, setRowsData] = useState(null)
  const { loading } = useLoading()
  const { alert } = useAlert()
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
      const json = await response.json()
      const [firstData] = json?.data.slice(0, 1)
      const [lastData] = json?.data.slice(-1)
      lastKey.current = [firstData?.key, lastData?.key]

      setRowsData({
        ...json,
        data: json.data.map((row) => ({ ...row, remove: row.id })),
      })
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

  const removeRow = async (id) => {
    const response = await loading(() =>
      fetch(process.env.REACT_APP_API_URL + `/access-rule/${id}`, {
        method: 'DELETE',
      })
    )
    if (response.ok) {
      alert({ message: '삭제되었습니다.', severity: 'success' })
      // 현재 페이지를 한번 더 불러온다..
      const [prevKey] = lastKey.current
      setValue('lastKey', prevKey)
      fetchCurrentPage()
    }
  }

  const columnHeaders = useMemo(() => listTableColumns({ removeRow }), [])

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
              columns={columnHeaders}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              onPaginationModelChange={(model) => {
                const isNext = paginationModel.page < model.page
                setPaginationModel(model)
                if (model.page > 0) {
                  const [prevKey, nextKey] = lastKey.current
                  setValue('lastKey', isNext ? nextKey : prevKey)
                  fetchCurrentPage(isNext ? 'next' : 'prev')
                } else {
                  setValue('lastKey', null)
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
