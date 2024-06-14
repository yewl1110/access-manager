import { atom, useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

export const alertState = atom({
  key: 'alertState',
  default: null,
})

export default function useAlert() {
  const [alert, setAlert] = useRecoilState(alertState)
  const [prev, setPrev] = useState(null)
  useEffect(() => {
    if (alert) {
      if (prev) {
        clearTimeout(prev)
      }
      setPrev(
        setTimeout(() => {
          setAlert(null)
        }, alert.time)
      )
    }
  }, [alert])

  return {
    alert: ({ message, severity, time = 3000 }) => {
      setAlert({ message, severity, time })
    },
  }
}
