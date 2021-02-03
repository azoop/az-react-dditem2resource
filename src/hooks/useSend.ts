import { useDispatch } from 'react-redux'
import { notificationAdded } from '../slices/notificationsSlice'

const useSend = () => {
  const dispatch = useDispatch()

  return (id: string, data: any) => {
    dispatch(notificationAdded({ id, data }))
  }
}

export { useSend }
