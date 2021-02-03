import * as React from "react"
import { useDragItem, timeStEdToStr } from "az-react-dditem2resource"

const Item = (props: any) => {
  const {
    data: item
  } = props

  const { collectedProps, drag } = useDragItem(item)
  const { isDragging }: any = collectedProps
  const timeWidth = timeStEdToStr(item.time)

  return (
    <div ref={drag} className="c-matter__list" style={{
      opacity: isDragging ? 0.5 : 1
    }} >
      <div className="c-flex">
        <span className="c-matter__list__size">{item.extra?.size}</span>
        <span className="c-matter__list__company">{item.extra?.company}</span>
      </div>
      <div className="c-flex">
        <span className="c-matter__list__time">{timeWidth}</span>
        <span className="c-matter__list__spot">{item.extra?.spot}</span>
      </div>
    </div>
  )
}

export default Item
