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
  option: string().test({
    test: () => {
      return true
    },
  }),
  searchMemo: string().test({
    test: () => {
      return true
    },
  }),
  searchPeriod: object({
    start: string()
      .datetime()
      .test({
        test: () => {
          return true
        },
      }),
    end: string()
      .datetime()
      .test({
        test: () => {
          return true
        },
      }),
  }),
})

export const listSchema = object({
  lastKey: number().positive(),
  limit: number().positive().required(),
}).concat(filterSchema)
