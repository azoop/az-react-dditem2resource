import * as React from "react"
import ItemOnTimeline from "./ItemOnTimeline"
import {
  countOverlappedItemsInResource,
  ItemInterface,
} from "az-react-dditem2resource"

const { useRef } = React

const Timeline = (props: any) => {
  const {
    data: resource
  } = props

  const items = resource.itemsOnTimeline
  const timelineRef = useRef(null)

  return (
    <div ref={timelineRef} className="c-calendar-cell__time-box__time-cell">
      { items.length > 0
        ? items.map((item: ItemInterface) => {
          const count = countOverlappedItemsInResource(resource, item)
          return <ItemOnTimeline key={item.id} resource={resource} item={item} count={count} timelineRef={timelineRef} />
        })
        : null
      }
    </div>
  )
}

export default Timeline
