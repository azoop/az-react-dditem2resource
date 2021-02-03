import * as React from "react"
import {
  useReceive,
  EVENT_DROP_ITEM_TO_RESOURCE,
  EVENT_RETURN_ITEM_TO_LIST,
} from "az-react-dditem2resource"

const { useEffect, useState } = React

const HandleDropItem = () => {
  const { data } = useReceive(EVENT_DROP_ITEM_TO_RESOURCE)
  const [eventData, setEventData] = useState({})

  useEffect(() => {
    if (data) {
      setEventData(data)
    }
  }, [data])

  useEffect(() => {
    if (eventData && !data) {
      const timerId = setTimeout(() => setEventData({}), 1500)
      return () => clearTimeout(timerId)
    }
    return () => {}
  }, [data, eventData])

  useEffect(() => {
    const {guard = true, error = null }: any = eventData
    if (!guard || error) {
      alert("タスクの割り当てができませんでした")
      setEventData({})
    }
  }, [eventData])

  const { resource, item }: any = eventData

  if (resource && item) {
    return (
      <p>{`${resource.name}に${item.name}を割り当てました`}</p>
    )
  }

  return null
}

const HandleReturnItem = () => {
  const { data } = useReceive(EVENT_RETURN_ITEM_TO_LIST)
  const [eventData, setEventData] = useState({})

  useEffect(() => {
    if (data) {
      setEventData(data)
    }
  }, [data])

  useEffect(() => {
    if (eventData && !data) {
      const timerId = setTimeout(() => setEventData({}), 1500)
      return () => clearTimeout(timerId)
    }
    return () => {}
  }, [data, eventData])

  const { resource, item }: any = eventData
  if (resource && item) {
    return (
      <p>{`${resource.name}から${item.name}を解除しました`}</p>
    )
  }

  return null
}

const HandleEvent = () => {
  return (
    <div className="c-message">
      <HandleDropItem />
      <HandleReturnItem />
    </div>
  )
}

export default HandleEvent
