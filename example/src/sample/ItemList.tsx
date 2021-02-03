import * as React from "react"
import {
  useItems,
  useParams,
  getBeginningOfDay,
  getEndOfDay,
  getMinDate,
  getMaxDate,
  ItemInterface,
} from "az-react-dditem2resource"

import Item from "./Item"

const { useState } = React

const ItemList = () => {
  const { items }: any = useItems()
  const { day } = useParams()
  const [tab, setTab] = useState(0)

  const dt = new Date(day)
  const dayStr = `${dt.getMonth() + 1}月${dt.getDate()}日発`
  const bDay = getBeginningOfDay(dt)
  const eDay = getEndOfDay(dt)
  const minDate = getMinDate()
  const maxDate = getMaxDate()

  const todayItems = items.filter((item: ItemInterface) => {
    const d1 = item.time.start ? new Date(item.time.start) : minDate
    const d2 = item.time.end ? new Date(item.time.end) : maxDate
    if (bDay <= d1 && d1 <= eDay) {
      return true
    }
    if (bDay <= d2 && d2 <= eDay) {
      return true
    }
    return false
  })

  return (
    <div className="c-calendar-cell-matter">
      <ul className="c-tab c-tab--matter">
        <li className={`c-tab--matter__list ${ tab === 0 ? "is-active" : ""}`} onClick={() => setTab(0)}>{dayStr}({`${todayItems.length}`}件)</li>
        <li className={`c-tab--matter__list ${ tab !== 0 ? "is-active" : ""}`} onClick={() => setTab(1)}>全て({`${items.length}`}件)</li>
      </ul>
      <div className="c-matter">
        {todayItems.length > 0 && tab === 0
          ? todayItems.map((item: ItemInterface) => <Item key={item.id} data={item} />)
          : null
        }
        {items.length > 0 && tab !== 0
          ? items.map((item: ItemInterface) => <Item key={item.id} data={item} />)
          : null
        }
      </div>
    </div>
  )
}

export default ItemList
