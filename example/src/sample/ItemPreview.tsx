import * as React from "react"
import { useItemPreview, timeStEdToStr } from "az-react-dditem2resource"

const ItemPreview = () => {
  const itemPreview = useItemPreview()
  if (!itemPreview.display) {
    return null
  }

  const item = itemPreview.item
  const timeWidth = timeStEdToStr(item.time)

  return (
    <div ref={itemPreview.drag} className="c-matter__list" style={itemPreview.style}>
      <div className="c-flex">
        <p className="c-matter__list__size">{item.extra?.size}</p>
        <p className="c-matter__list__company">{item.extra?.company}</p>
      </div>
      <div className="c-flex">
        <span className="c-matter__list__time">{timeWidth}</span>
        <span className="c-matter__list__spot">{item.extra?.spot}</span>
      </div>
    </div>
  )
}

export default ItemPreview
