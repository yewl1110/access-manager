import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import SmallDateTimePicker from './SmallDateTimePicker'
import React, { useEffect, useState } from 'react'
import ButtonWithPopover from './ButtonWithPopover'
import { useYupValidationResolver } from '../hooks/useYupValidationResolver'
import { filterSchema } from '../schema/schema'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

export default function SearchForm({
  submit,
  setSubmitParam,
  resetSubmitParam,
}) {
  const [searchOption, setSearchOption] = useState('') // '' | 'memo' | 'period'

  const resolver = useYupValidationResolver(filterSchema)
  const { register, watch, setValue, reset, resetField, getValues } = useForm({
    resolver,
    mode: 'all',
  })

  const setFilter = () => {
    resetField('searchMemo')
    resetField('searchPeriod')
    resetSubmitParam('searchMemo')
    resetSubmitParam('searchPeriod')

    resetSubmitParam('lastKey')
    if (searchOption === 'memo') {
      setSubmitParam('searchMemo', getValues('searchMemo'))
    }
    if (searchOption === 'period') {
      setSubmitParam('searchPeriod', getValues('searchPeriod'))
    }
  }

  useEffect(() => {
    reset()
  }, [searchOption])

  return (
    <>
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
            sx={{ mr: 1 }}
            {...register('searchMemo')}
          />
        )}
        {searchOption === 'period' && (
          <>
            <SmallDateTimePicker
              label={'차단 시작 날짜'}
              sx={{ mr: 1 }}
              setValue={(value) => {
                setValue('searchPeriod.start', value)
              }}
              value={
                (watch('searchPeriod.start') &&
                  dayjs(watch('searchPeriod.start'))) ||
                null
              }
            />
            <SmallDateTimePicker
              label={'차단 해제 날짜'}
              sx={{ mr: 1 }}
              setValue={(value) => {
                setValue('searchPeriod.end', value)
              }}
              value={
                (watch('searchPeriod.end') &&
                  dayjs(watch('searchPeriod.end'))) ||
                null
              }
            />
          </>
        )}
        {searchOption && (
          <Button
            onClick={() => {
              setFilter()
              submit()
            }}
          >
            검색
          </Button>
        )}
      </Box>
      <Box sx={{ my: 'auto', ml: 'auto' }}>
        {searchOption && (
          <ButtonWithPopover
            handleClick={() => setSearchOption('')}
            buttonText={'검색 옵션 초기화'}
            message={'검색 옵션을 초기화 후 1페이지부터 다시 불러옵니다.'}
          />
        )}
      </Box>
    </>
  )
}
