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
import useAlert from '../hooks/useAlert'

export default function SearchForm({
  submit,
  setSubmitParam,
  resetSubmitParam,
  resetTable,
}) {
  const [searchOption, setSearchOption] = useState('') // '' | 'memo' | 'period'
  const { alert } = useAlert()

  const resolver = useYupValidationResolver(filterSchema)
  const {
    register,
    watch,
    setValue,
    resetField,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver,
    mode: 'all',
  })

  const setFilter = () => {
    resetSubmitParam('lastKey')
    if (searchOption === 'memo') {
      setSubmitParam('searchMemo', getValues('searchMemo'))
    }
    if (searchOption === 'period') {
      setSubmitParam('searchPeriod', getValues('searchPeriod'))
    }
  }

  useEffect(() => {
    resetField('searchMemo')
    resetField('searchPeriod.start')
    resetField('searchPeriod.end')
    setValue('searchPeriod.start', null)
    setValue('searchPeriod.end', null)
    clearErrors()
  }, [searchOption])

  useEffect(() => {
    if (errors) {
      const _errors = Object.entries(errors)
      if (_errors.length) {
        const [error] = _errors
        const [, value] = error
        alert({ message: value.message, severity: 'error' })
      }
    }
  }, [errors])

  return (
    <>
      <Box sx={{ my: 'auto', mr: 1 }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <Select
            displayEmpty
            value={searchOption}
            onChange={(event) => {
              const value = event.target.value
              setSearchOption(value)
              setValue('searchOption', value)
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
            label="검색어"
            size="small"
            sx={{ mr: 1 }}
            error={!!errors['searchMemo']}
            inputProps={{ ...register('searchMemo'), maxLength: 20 }}
            onBlur={(event) => {
              event.target.value = event.target.value.trim()
            }}
          />
        )}
        {searchOption === 'period' && (
          <>
            <SmallDateTimePicker
              label={'차단 시작 날짜 (필수값)'}
              sx={{ mr: 1 }}
              error={!!errors['searchPeriod.start']}
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
              label={'차단 해제 날짜 (선택값)'}
              sx={{ mr: 1 }}
              error={!!errors['searchPeriod.end']}
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
              handleSubmit(() => submit())()
            }}
          >
            검색
          </Button>
        )}
      </Box>
      <Box sx={{ my: 'auto', ml: 'auto' }}>
        {searchOption && (
          <ButtonWithPopover
            handleClick={() => {
              setSearchOption('')
              resetTable()
            }}
            buttonText={'검색 옵션 초기화'}
            message={'검색 옵션을 초기화 후 1페이지부터 다시 불러옵니다.'}
          />
        )}
      </Box>
    </>
  )
}
