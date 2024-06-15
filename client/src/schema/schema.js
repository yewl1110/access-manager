import { number, object, string } from 'yup'

export const ruleSchema = object({
  ip: string()
    .matches(
      /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
      '올바른 IP 형식이 아닙니다.'
    )
    .required('필수 항목입니다.'),
  memo: string().max(20).required('필수 항목입니다.'),
  period: object({
    start: string()
      .datetime('잘못된 날짜 형식입니다.')
      .required('필수 항목입니다.')
      .test({
        test: (value, ctx) => {
          if (!!ctx.parent.end && value >= ctx.parent.end) {
            return ctx.createError({
              message: '차단 시작 날짜는 해제 날짜보다 빨라야 합니다.',
            })
          }
          return true
        },
      }),
    end: string()
      .datetime('잘못된 날짜 형식입니다.')
      .required('필수 항목입니다.')
      .test({
        test: (value, ctx) => {
          if (!!ctx.parent.start && ctx.parent.start >= value) {
            return ctx.createError({
              message: '차단 해제 날짜는 시작 날짜보다 늦어야 합니다.',
            })
          }
          return true
        },
      }),
  }),
})

export const filterSchema = object({
  searchOption: string().test({
    // '' | 'memo' | 'period'
    test: () => {
      return true
    },
  }),
  searchMemo: string()
    .max(20, '최대 20자까지만 가능합니다.')
    .test({
      test: (value, ctx) => {
        if (ctx.parent.searchOption === 'memo') {
          if (!value) {
            return ctx.createError({ message: '검색어는 필수값입니다.' })
          }
        }
        return true
      },
    })
    .nullable(),
  searchPeriod: object({
    start: string()
      .datetime()
      .test({
        message: '차단 시작 날짜는 필수값입니다.',
        test: (value, ctx) => {
          if (ctx.parent.searchOption === 'period') {
            if (!value) {
              return ctx.createError({
                message: '차단 시작 날짜는 필수값입니다.',
              })
            }
            if (value >= ctx.parent.end) {
              return ctx.createError({
                message: '차단 시작 날짜는 해제 날짜보다 이전이여야 합니다.',
              })
            }
          }
          return true
        },
      })
      .optional(),

    end: string()
      .datetime()
      .test({
        test: (value, ctx) => {
          if (value && ctx.parent.start >= value) {
            return ctx.createError({
              message: '차단 해제 날짜는 시작 날짜보다 이후여야 합니다.',
            })
          }
          return true
        },
      })
      .nullable(),
  }).nullable(),
})

export const listSchema = object({
  lastKey: number().positive().nullable(),
  limit: number().positive().required(),
}).concat(filterSchema)
