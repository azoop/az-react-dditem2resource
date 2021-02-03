import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const notificationAdapter: any = createEntityAdapter()
const initialState = notificationAdapter.getInitialState()

const notificationsSlice = createSlice({
  name: 'az/dditem2resource/notifications',
  initialState,
  reducers: {
    notificationAdded: (state, action) => {
      notificationAdapter.upsertOne(state, action.payload)
    },
    notificationRemoved: (state, action) => {
      const { id } = action.payload
      notificationAdapter.removeOne(state, id)
    }
  }
})

export const {
  notificationAdded,
  notificationRemoved
} = notificationsSlice.actions

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds
} = notificationAdapter.getSelectors((state: any) => state.notifications)

export default notificationsSlice.reducer
