import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from '../slices/notificationsSlice'

let paramsSlice: any = null
let itemsSlice: any = null
let fetchItems: any = null
let itemsAdapter: any = null
let itemsSelectors: any = null
let resourcesSlice: any = null
let fetchResources: any = null
let resourcesAdapter: any = null
let resourcesSelectors: any = null

let initialized = false

const useAzDDItem2Resource = (props: any = {}, force = false) => {
  const {
    postParamsSlice,
    postItemsSlice,
    postFetchItems,
    postItemsAdapter,
    postItemsSelectors,
    postResourcesSlice,
    postFetchResources,
    postResourcesAdapter,
    postResourcesSelectors
  } = props

  if (force) {
    initialized = false
  }

  if (initialized) {
    return {
      paramsSlice,
      itemsSlice,
      fetchItems,
      itemsAdapter,
      itemsSelectors,
      resourcesSlice,
      fetchResources,
      resourcesAdapter,
      resourcesSelectors
    }
  }

  if (!postParamsSlice) throw Error('required postParamsSlice')
  if (!postItemsSlice) throw Error('required postItemsSlice')
  if (!postFetchItems) throw Error('required postFetchItems')
  if (!postItemsAdapter) throw Error('required postItemsAdapter')
  if (!postItemsSelectors) throw Error('required postItemsSelectors')
  if (!postResourcesSlice) throw Error('required postResourcesSlice')
  if (!postFetchResources) throw Error('required postFetchResources')
  if (!postResourcesAdapter) throw Error('required postResourcesAdapter')
  if (!postResourcesSelectors) throw Error('required postResourcesSelectors')

  paramsSlice = postParamsSlice
  itemsSlice = postItemsSlice
  fetchItems = postFetchItems
  itemsAdapter = postItemsAdapter
  itemsSelectors = postItemsSelectors
  resourcesSlice = postResourcesSlice
  fetchResources = postFetchResources
  resourcesAdapter = postResourcesAdapter
  resourcesSelectors = postResourcesSelectors

  const store = configureStore({
    reducer: {
      params: paramsSlice.reducer,
      items: itemsSlice.reducer,
      resources: resourcesSlice.reducer,
      notifications: notificationsReducer
    }
  })
  initialized = true

  // initialized 直後だけ `store` を返す
  return {
    store,
    paramsSlice,
    itemsSlice,
    fetchItems,
    itemsAdapter,
    itemsSelectors,
    resourcesSlice,
    fetchResources,
    resourcesAdapter,
    resourcesSelectors
  }
}

export { useAzDDItem2Resource }
