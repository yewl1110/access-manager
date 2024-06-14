import dayjs from 'dayjs'

export const utcToLocalTimezone = (utcTime) => {
  const timezone = dayjs.tz.guess()
  return dayjs(utcTime).tz(timezone).format(`YYYY-MM-DD hh:mm A`)
}
