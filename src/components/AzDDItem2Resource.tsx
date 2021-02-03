import * as React from 'react'
import {
  useParamsSlice,
  useItemsSlice,
  useResourcesSlice,
  useAzDDItem2Resource
} from '../hooks'
import { AzDDItem2ResourceProvider } from './AzDDItem2ResourceProvider'

const AzDDItem2Resource = (props: any) => {
  const {
    asyncFetchItemsFunction, // required
    asyncFetchResourcesFunction, // required
    params = {},
    selectItemId = null,
    sortItemComparer = null,
    selectResourceId = null,
    sortResourceComparer = null,
    children
  } = props

  // create paramsSlice
  const { paramsSlice } = useParamsSlice(params)

  // create itemsSlice
  const {
    itemsSlice,
    fetchItems,
    itemsAdapter,
    itemsSelectors
  } = useItemsSlice({
    asyncFetchItemsFunction,
    selectId: selectItemId,
    sortComparer: sortItemComparer
  })

  // create resourcesSlice
  const {
    resourcesSlice,
    fetchResources,
    resourcesAdapter,
    resourcesSelectors
  } = useResourcesSlice({
    asyncFetchResourcesFunction,
    selectId: selectResourceId,
    sortComparer: sortResourceComparer
  })

  // create store
  const { store } = useAzDDItem2Resource(
    {
      postParamsSlice: paramsSlice,
      postItemsSlice: itemsSlice,
      postFetchItems: fetchItems,
      postItemsAdapter: itemsAdapter,
      postItemsSelectors: itemsSelectors,
      postResourcesSlice: resourcesSlice,
      postFetchResources: fetchResources,
      postResourcesAdapter: resourcesAdapter,
      postResourcesSelectors: resourcesSelectors
    },
    true
  )

  return (
    <AzDDItem2ResourceProvider store={store}>
      {children}
    </AzDDItem2ResourceProvider>
  )
}

export { AzDDItem2Resource }
