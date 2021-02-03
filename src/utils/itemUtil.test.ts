import { ItemInterface } from 'src/interfaces' // eslint-disable-line no-unused-vars

import { createItemData, isItemOverlap, comparerItem } from './itemUtil'

const today = new Date()
const createDate = (dt: Date, h: number, m: number, s: number = 0) => {
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), h, m, s, 0)
}

describe('isItemOverlap', () => {
  test('アイテム同士の時間が重なっていない場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 11, 1)
    const edDt2 = createDate(today, 12, 0)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(false)
    expect(isItemOverlap(item2, item1)).toEqual(false)
  })

  test('連続した時間のアイテムの場合(重ならない)', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 11, 0)
    const edDt2 = createDate(today, 12, 0)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(false)
    expect(isItemOverlap(item2, item1)).toEqual(false)
  })

  test('アイテムの時間が一部重なっている場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 10, 30)
    const edDt2 = createDate(today, 11, 30)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })

  test('アイテムの時間が完全に一致している場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 10, 0)
    const edDt2 = createDate(today, 11, 0)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })

  test('アイテムが片方のアイテムを含んでいる・含まれている場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 10, 1)
    const edDt2 = createDate(today, 10, 59)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })

  test('アイテムの開始が同じで終了が違う場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 10, 0)
    const edDt2 = createDate(today, 10, 59)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })

  test('アイテムの終了が同じで開始が違う場合', () => {
    const stDt1 = createDate(today, 10, 0)
    const edDt1 = createDate(today, 11, 0)
    const stDt2 = createDate(today, 10, 1)
    const edDt2 = createDate(today, 11, 0)

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })

  test('アイテムの1つに時間幅の設定がない場合', () => {
    const stDt = createDate(today, 10, 0, 0)
    const edDt = createDate(today, 11, 0, 0)

    const item1 = createItemData()
    const item2 = createItemData({
      time: { start: stDt.toISOString(), end: edDt.toISOString() }
    })

    expect(isItemOverlap(item1, item2)).toEqual(true)
    expect(isItemOverlap(item2, item1)).toEqual(true)
  })
})

describe('comparerItem', () => {
  test('item1 < item2', () => {
    const stDt1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      10,
      0,
      0
    )
    const edDt1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0,
      0
    )
    const stDt2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0,
      0
    )
    const edDt2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12,
      0,
      0
    )

    const item1 = createItemData({
      time: { start: stDt1.toISOString(), end: edDt1.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt2.toISOString(), end: edDt2.toISOString() }
    })

    expect(comparerItem(item1, item2)).toEqual(-1)
    expect(comparerItem(item2, item1)).toEqual(1)
  })

  test('item1 === item2', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      10,
      0,
      0,
      0
    )
    const edDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11,
      0,
      0,
      0
    )

    const item1 = createItemData({
      time: { start: stDt.toISOString(), end: edDt.toISOString() }
    })
    const item2 = createItemData({
      time: { start: stDt.toISOString(), end: edDt.toISOString() }
    })

    expect(comparerItem(item1, item2)).toEqual(0)
    expect(comparerItem(item2, item1)).toEqual(0)
  })
})
