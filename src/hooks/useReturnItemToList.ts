import { useDispatch } from 'react-redux'
import { useSend } from './useSend'
import { useAzDDItem2Resource } from './useAzDDItem2Resource'
import { EVENT_RETURN_ITEM_TO_LIST } from '../constants'
import { createActionProcess } from '../utils'

const useReturnItemToList = () => {
  const dispatch = useDispatch()
  const send = useSend()

  const { resourcesSlice, itemsSlice } = useAzDDItem2Resource()
  const { itemRemovedFromResource } = resourcesSlice.actions
  const { itemAdded } = itemsSlice.actions

  return createActionProcess({
    process: ({ resource, item }) => {
      dispatch(itemRemovedFromResource({ id: resource.id, item }))
      dispatch(itemAdded(item))
    },
    finallyProcess: ({ resource, item }, { guard, error }) => {
      send(EVENT_RETURN_ITEM_TO_LIST, {
        resource,
        item,
        guard,
        error
      })
    }
  })
}

export { useReturnItemToList }
