import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit'

import { ItemInterface } from '../interfaces' // eslint-disable-line no-unused-vars
import { comparerItem } from '../utils'

const defaultSelectId = (item: ItemInterface) => item.id

const useItemsSlice = (props: any) => {
  const {
    asyncFetchItemsFunction,
    selectId = null,
    sortComparer = null
  } = props

  const itemsAdapter = createEntityAdapter({
    selectId: selectId || defaultSelectId,
    sortComparer: sortComparer || comparerItem
  })
  const itemsSelectors = itemsAdapter.getSelectors((state: any) => state.items)

  const initialState = itemsAdapter.getInitialState({
    status: 'idle',
    error: null
  })

  const fetchItems: any = createAsyncThunk(
    'az/dditem2resource/items/fetchItems',
    async (params) => {
      return await asyncFetchItemsFunction(params)
    }
  )

  const itemsSlice = createSlice({
    name: 'az/dditem2resource/items',
    initialState,
    reducers: {
      itemAdded: (state, action) => {
        itemsAdapter.upsertOne(state, action.payload)
      },
      itemRemoved: (state, action) => {
        itemsAdapter.removeOne(state, action.payload.id)
      },
      itemAllRemoved: (state, _action) => {
        itemsAdapter.removeAll(state)
        state.status = 'idle'
      }
    },
    extraReducers: {
      [fetchItems.pending]: (state, _action) => {
        state.status = 'loading'
      },
      [fetchItems.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        itemsAdapter.upsertMany(state, action.payload)
      },
      [fetchItems.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    }
  })

  return {
    itemsSlice,
    fetchItems,
    itemsAdapter,
    itemsSelectors
  }
}

export { useItemsSlice }
