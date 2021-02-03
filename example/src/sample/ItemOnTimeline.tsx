import * as React from "react"
import {
  useWindowSize,
  useReturnItemToList,
  timeStEdToStr,
  getBeginningOfDay,
  getEndOfDay,
  findOverlappedItemsInResource,
  ItemInterface,
} from "az-react-dditem2resource"

const { useState, useEffect, useRef } = React

const tmpDay = new Date()
const beginningOfDay = getBeginningOfDay(tmpDay)
const endOfDay = getEndOfDay(tmpDay)

const calcPoint = (dt: Date) => {
  // 15分刻みを採用
  // (hour * 60 / 15 = hour * 4)
  return (dt.getHours() * 4) + (dt.getMinutes() / 15)
}
const calcPositionAndWidth = (timelineWidth: number, item: ItemInterface) => {
  const st = item.time?.start ? new Date(item.time.start) : beginningOfDay
  const ed = item.time?.end ? new Date(item.time.end) : endOfDay

  const stPt = calcPoint(st)
  const edPt = calcPoint(ed)

  const baseFormula = timelineWidth / 96

  return {
    pointX: baseFormula * stPt,
    width: baseFormula * (edPt - stPt + 1)
  }
}

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
const dummyRequest = async () => {
  await sleep(800)
  return "ok"
}

const ItemOnTimeline = (props: any) => {
  const {
    resource,
    item,
    timelineRef,
  } = props

  const itemRef = useRef<HTMLDivElement>(null)
  const returnItemToList = useReturnItemToList()
  const [itemState, setItemState] = useState("")
  const [itemStyle, setItemStyle] = useState({})
  const [windowWidth, windowHeight] = useWindowSize()
  const timeWidth = timeStEdToStr(item.time)
  const overlappedItems = findOverlappedItemsInResource(resource, item)
  let itemIndex = 0
  overlappedItems.forEach((i, idx) => {
    if (i.id === item.id) {
      itemIndex = idx
      return
    }
  })

  const onClickRemove = async () => {
    // サーバ処理に投げる前にアイテムの状態を変更しておく
    setItemState("")
    const result = await dummyRequest()
    if (result === "ok") {
      returnItemToList({ resource, item })
    } else {
      alert("解除処理に失敗しました")
    }
  }

  useEffect(() => {
    // 時間が重なっている場合の位置の調整
    let overlappedStyle = {}
    if (overlappedItems.length > 1) {
      const h = itemRef?.current?.offsetHeight || 0
      overlappedStyle = {
        top: (h + 1) * itemIndex,
        padding: "3px"
      }
    }

    // 時間によるX軸の位置算出
    const { pointX, width } = calcPositionAndWidth(timelineRef.current.offsetWidth, item)
    setItemStyle({...{
      transform: `translateX(${pointX}px)`,
      width: width
    }, ...overlappedStyle})
  }, [timelineRef, item, windowWidth, windowHeight])

  useEffect(() => {
    // ドロップ直後にサーバに通信して登録する処理のダミー処理
    const process = async () => {
      const result = await dummyRequest()
      if (result === "ok") {
        // サーバ処理がOKだったら状態を変更して色を変える
        setItemState("c-matter__list--ok")
      } else {
        alert("処理に失敗しました")
      }
    }
    process()
  }, [])

  return (
    <div ref={itemRef} className={`c-matter__list ${itemState}`} style={itemStyle}>
      <div className="c-matter__list__detail">
        <div className="c-flex">
          <p className="c-matter__list__size">{item.extra?.size}</p>
          <p className="c-matter__list__company">{item.extra?.company}</p>
        </div>
        <div className="c-flex">
          <span className="c-matter__list__time js-time">{timeWidth}</span>
          <span className="c-matter__list__spot">{item.extra?.spot}</span>
        </div>
        <div className="c-flex">
          <a className="c-matter__list__btn" href="#">案件詳細を見る</a>
          <a className="c-matter__list__btn" href="#" onClick={onClickRemove}>割り当てを解除する</a>
        </div>
      </div>
      { overlappedItems.length > 1
        ?
          <div className="c-flex">
            <div className="c-flex">
              <p className="c-matter__list__size">{item.extra?.size}</p>
            </div>
          </div>
        :
          <div className="c-flex">
            <div className="c-flex">
              <p className="c-matter__list__size">{item.extra?.size}</p>
              <p className="c-matter__list__company">{item.extra?.company}</p>
            </div>
            <div className="c-flex">
              <span className="c-matter__list__time js-time">{timeWidth}</span>
              <span className="c-matter__list__spot">{item.extra?.spot}</span>
            </div>
          </div>
      }
    </div>
  )
}

export default ItemOnTimeline
