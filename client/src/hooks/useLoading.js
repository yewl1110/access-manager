import { atom, useRecoilState } from 'recoil'

export const backdropState = atom({
  key: 'backdropState',
  default: false,
})

export default function useLoading() {
  const [isLoading, setIsLoading] = useRecoilState(backdropState)

  return {
    loading: async (fn) => {
      let result = null
      try {
        setIsLoading(true)
        result = await fn()
      } catch (e) {
      } finally {
        setIsLoading(false)
        return result
      }
    },
  }
}
