import { useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { EVENT_DROP_ITEM_TO_RESOURCE } from '../constants'
import { createActionProcess, canAddItemToResource } from '../utils'
import { useAzDDItem2Resource } from './useAzDDItem2Resource'
import { useSend } from './useSend'

const useDropItemToResource = (
  resource: any,
  dropActionProps: any = {},
  dropProps: any = {}
) => {
  const dispatch = useDispatch()
  const send = useSend()

  const { itemsSlice, resourcesSlice } = useAzDDItem2Resource()
  const { itemRemoved } = itemsSlice.actions
  const { itemAddedToResource } = resourcesSlice.actions

  const dropAction = createActionProcess({
    ...{
      guard: ({ resource, item }) => {
        return canAddItemToResource(resource, item)
      },
      process: ({ resource, item }) => {
        dispatch(itemRemoved(item))
        dispatch(itemAddedToResource({ id: resource.id, item }))
      },
      finallyProcess: ({ resource, item }, { guard, error }) => {
        send(EVENT_DROP_ITEM_TO_RESOURCE, {
          resource,
          item,
          guard,
          error
        })
      }
    },
    ...dropActionProps
  })

  // see: https://react-dnd.github.io/react-dnd/docs/api/use-drop
  const [collectedProps, drop] = useDrop({
    accept: resource.acceptTypes,
    drop: (item, monitor) => {
      dropAction({ item, resource, monitor })
    },
    ...dropProps
  })

  return {
    collectedProps,
    drop
  }
}

export { useDropItemToResource }
