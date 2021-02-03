import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAzDDItem2Resource } from '../hooks/useAzDDItem2Resource'

const useItems = () => {
  const dispatch = useDispatch()
  const { itemsSelectors, fetchItems } = useAzDDItem2Resource()
  const { selectAll } = itemsSelectors
  const items = useSelector(selectAll)
  const itemStatus = useSelector((state: any) => state.items.status)
  const params = useSelector((state: any) => state.params)

  useEffect(() => {
    if (itemStatus === 'idle') {
      dispatch(fetchItems(params))
    }
  }, [itemStatus, dispatch, fetchItems, params])

  return {
    items,
    itemStatus
  }
}

export { useItems }
