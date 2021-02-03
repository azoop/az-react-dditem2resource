import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAzDDItem2Resource } from './useAzDDItem2Resource'

const useResources = () => {
  const dispatch = useDispatch()
  const { resourcesSelectors, fetchResources } = useAzDDItem2Resource()
  const { selectAll } = resourcesSelectors
  const resources = useSelector(selectAll)
  const resourceStatus = useSelector((state: any) => state.resources.status)
  const params = useSelector((state: any) => state.params)

  useEffect(() => {
    if (resourceStatus === 'idle') {
      dispatch(fetchResources(params))
    }
  }, [resourceStatus, dispatch, fetchResources, params])

  return {
    resources,
    resourceStatus
  }
}

export { useResources }
