import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit'

import { ResourceInterface } from '../interfaces' // eslint-disable-line no-unused-vars
import { addItemToResource, removeItemFromResource } from '../utils'

const defaultSelectId = (resource: ResourceInterface) => resource.id
const defaultSortComparer = (a: ResourceInterface, b: ResourceInterface) => {
  return a.name.localeCompare(b.name)
}

const useResourcesSlice = (props: any) => {
  const {
    asyncFetchResourcesFunction,
    selectId = null,
    sortComparer = null
  } = props

  const resourcesAdapter = createEntityAdapter({
    selectId: selectId || defaultSelectId,
    sortComparer: sortComparer || defaultSortComparer
  })
  const resourcesSelectors = resourcesAdapter.getSelectors(
    (state: any) => state.resources
  )

  const initialState = resourcesAdapter.getInitialState({
    status: 'idle',
    error: null
  })

  const fetchResources: any = createAsyncThunk(
    'az/dditem2resource/resources/fetchResources',
    async (params) => {
      return await asyncFetchResourcesFunction(params)
    }
  )

  const resourcesSlice = createSlice({
    name: 'az/dditem2resource/resources',
    initialState,
    reducers: {
      itemAddedToResource: (state, action) => {
        const { id: resourceId, item } = action.payload

        const existsResource: any = state.entities[resourceId]
        if (existsResource) {
          const updResource = addItemToResource(existsResource, item)
          existsResource.itemsOnTimeline = updResource.itemsOnTimeline
          resourcesAdapter.updateOne(state, existsResource)
        }
      },
      itemRemovedFromResource: (state, action) => {
        const { id: resourceId, item } = action.payload

        const existsResource: any = state.entities[resourceId]
        if (existsResource) {
          const updResource = removeItemFromResource(existsResource, item)
          existsResource.itemsOnTimeline = updResource.itemsOnTimeline
          resourcesAdapter.updateOne(state, existsResource)
        }
      },
      resourcesAllRemoved: (state, _action) => {
        resourcesAdapter.removeAll(state)
        state.status = 'idle'
      }
    },
    extraReducers: {
      [fetchResources.pending]: (state, _action) => {
        state.status = 'loading'
      },
      [fetchResources.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        resourcesAdapter.upsertMany(state, action.payload)
      },
      [fetchResources.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    }
  })

  return {
    resourcesSlice,
    fetchResources,
    resourcesAdapter,
    resourcesSelectors
  }
}

export { useResourcesSlice }
