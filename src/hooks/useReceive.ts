import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectNotificationById,
  notificationRemoved
} from '../slices/notificationsSlice'

const DEFAULT_RESULT = {
  data: null,
  flush: () => null
}

const useReceive = (id: string, needFlush = true) => {
  const dispatch = useDispatch()
  const notification: any = useSelector((state: any) =>
    selectNotificationById(state, id)
  )

  useEffect(() => {
    if (needFlush && notification) {
      dispatch(notificationRemoved({ id }))
    }
  }, [id, needFlush, dispatch, notification])

  if (notification) {
    return {
      data: notification.data,
      flush: () =>
        needFlush ? () => null : dispatch(notificationRemoved({ id }))
    }
  }

  return DEFAULT_RESULT
}

export { useReceive }
