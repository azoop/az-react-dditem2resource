import { useDispatch } from 'react-redux'
import { useAzDDItem2Resource } from './useAzDDItem2Resource'

const useParamsSet = (args: any = null) => {
  const dispatch = useDispatch()
  const { paramsSlice } = useAzDDItem2Resource()
  const { paramsSet } = paramsSlice.actions

  const setParams = (params: any) => {
    dispatch(paramsSet(params))
  }

  if (args !== null) {
    setParams(args)
  }

  return setParams
}

export { useParamsSet }
