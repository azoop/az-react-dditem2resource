import { createItemData } from './itemUtil'

import {
  createResourceData,
  isItemInActivityTime,
  isItemInInactiveTimes,
  countOverlappedItemsInResource,
  findOverlappedItemsInResource,
  addItemToResource,
  removeItemFromResource
} from './resourceUtil'

const today = new Date()

const createDate = (dt: Date, h: number, m: number, s: number = 0): Date => {
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), h, m, s, 0)
}

describe('isItemInActivityTime', () => {
  test('アイテムの開始が活動時間より前の場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 9, 59).toISOString(),
        end: createDate(today, 11, 0).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(false)
  })

  test('活動時間の開始とアイテムの開始が同じ場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 11, 0).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(true)
  })

  test('活動時間の終了とアイテムの終了が同じ場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 18, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(true)
  })

  test('アイテムが活動時間内に含まれている場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 10, 1).toISOString(),
        end: createDate(today, 18, 59).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(true)
  })

  test('アイテムの終了が活動時間をはみ出している場合', () => {
    // アイテムの開始が活動時間内であれば、活動時間内であると判定する
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 18, 59).toISOString(),
        end: createDate(today, 19, 1).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(true)
  })

  test('アイテムの開始が活動時間の終了より後の場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 19, 1).toISOString(),
        end: createDate(today, 19, 2).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(false)
  })

  test('アイテムの時間が活動時間を含んでいる場合', () => {
    const resource = createResourceData({
      activityTime: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    const item = createItemData({
      time: {
        start: createDate(today, 9, 59).toISOString(),
        end: createDate(today, 19, 1).toISOString()
      }
    })
    expect(isItemInActivityTime(resource, item)).toEqual(false)
  })
})

describe('isItemInInactiveTimes', () => {
  test('非活動時間がない場合', () => {
    const resource = createResourceData({
      inactiveTimes: []
    })
    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(false)
  })

  test('非活動時間が設定されている、かつアイテムに時間設定がない場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 13, 0),
          end: createDate(today, 14, 0)
        }
      ]
    })
    const item = createItemData({
      time: {
        start: '',
        end: ''
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })

  test('アイテムの開始が非活動時間より前の場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 9, 59).toISOString(),
        end: createDate(today, 11, 0).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(false)
  })

  test('非活動時間の開始とアイテムの開始が同じ場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 10, 0).toISOString(),
        end: createDate(today, 11, 0).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })

  test('非活動時間の終了とアイテムの終了が同じ場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 18, 0).toISOString(),
        end: createDate(today, 19, 0).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })

  test('アイテムが非活動時間内に含まれている場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 10, 1).toISOString(),
        end: createDate(today, 18, 59).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })

  test('アイテムの終了が非活動時間をはみ出している場合', () => {
    // アイテムの開始が活動時間内であれば、活動時間内であると判定する
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 18, 59).toISOString(),
        end: createDate(today, 19, 1).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })

  test('アイテムの開始が非活動時間の終了より後の場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 19, 1).toISOString(),
        end: createDate(today, 19, 2).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(false)
  })

  test('アイテムの時間が非活動時間を含んでいる場合', () => {
    const resource = createResourceData({
      inactiveTimes: [
        {
          start: createDate(today, 10, 0).toISOString(),
          end: createDate(today, 19, 0).toISOString()
        }
      ]
    })
    const item = createItemData({
      time: {
        start: createDate(today, 9, 59).toISOString(),
        end: createDate(today, 19, 1).toISOString()
      }
    })
    expect(isItemInInactiveTimes(resource, item)).toEqual(true)
  })
})

describe('countOverlappedItemsInResource', () => {
  test('count == 0', () => {
    const resource = createResourceData({
      itemsOnTimeline: []
    })

    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    expect(countOverlappedItemsInResource(resource, item)).toEqual(0)
  })

  test('count == 1', () => {
    const resource = createResourceData({
      itemsOnTimeline: [
        createItemData({
          time: {
            start: createDate(today, 11, 0).toISOString(),
            end: createDate(today, 12, 0).toISOString()
          }
        })
      ]
    })

    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    expect(countOverlappedItemsInResource(resource, item)).toEqual(1)
  })

  test('count == 1', () => {
    const resource = createResourceData({
      itemsOnTimeline: [
        createItemData({
          time: {
            start: createDate(today, 10, 30).toISOString(),
            end: createDate(today, 11, 30).toISOString()
          }
        }),
        createItemData({
          time: {
            start: createDate(today, 11, 30).toISOString(),
            end: createDate(today, 12, 30).toISOString()
          }
        })
      ]
    })

    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    expect(countOverlappedItemsInResource(resource, item)).toEqual(2)
  })
})

describe('findOverlappedItemsInResource', () => {
  test('アイテムがない場合', () => {
    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: []
    })

    expect(findOverlappedItemsInResource(resource, item)).toEqual([])
  })

  test('アイテムの時間が重なっていない場合', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item2]
    })

    expect(findOverlappedItemsInResource(resource, item1)).toEqual([])
  })

  test('アイテムが重なっている場合', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item2]
    })

    expect(findOverlappedItemsInResource(resource, item1)).toEqual([item2])
  })
})

describe('addItemToResource', () => {
  test('アイテムが空のリソースに1つアイテムを追加する', () => {
    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: []
    })

    const added = addItemToResource(resource, item)
    expect(added.itemsOnTimeline).toEqual([item])
  })

  test('アイテムが既にあるリソースに1つアイテムを追加する', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item1]
    })

    const added = addItemToResource(resource, item2)
    expect(added.itemsOnTimeline).toEqual([item1, item2])
  })

  test('追加したアイテムが最初の要素に並び替えられる', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item2]
    })

    const added = addItemToResource(resource, item1)
    expect(added.itemsOnTimeline).toEqual([item1, item2])
  })

  test('追加したアイテムが2番目の要素に並び替えられる', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })
    const item3 = createItemData({
      time: {
        start: createDate(today, 13, 0).toISOString(),
        end: createDate(today, 14, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item1, item3]
    })

    const added = addItemToResource(resource, item2)
    expect(added.itemsOnTimeline).toEqual([item1, item2, item3])
  })
})

describe('removeItemFromResource', () => {
  test('アイテムが空のリソースからアイテムを削除する', () => {
    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: []
    })

    const removed = removeItemFromResource(resource, item)
    expect(removed.itemsOnTimeline).toEqual([])
  })

  test('1つアイテムがあるリソースからそのアイテムを削除する', () => {
    const item = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item]
    })

    const removed = removeItemFromResource(resource, item)
    expect(removed.itemsOnTimeline).toEqual([])
  })

  test('2つアイテムがあるリソースから1つのアイテムを削除する', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item1, item2]
    })

    const removed = removeItemFromResource(resource, item1)
    expect(removed.itemsOnTimeline).toEqual([item2])
  })

  test('3つアイテムがあるリソースから2番目のアイテムを削除する', () => {
    const item1 = createItemData({
      time: {
        start: createDate(today, 11, 0).toISOString(),
        end: createDate(today, 12, 0).toISOString()
      }
    })
    const item2 = createItemData({
      time: {
        start: createDate(today, 12, 0).toISOString(),
        end: createDate(today, 13, 0).toISOString()
      }
    })
    const item3 = createItemData({
      time: {
        start: createDate(today, 13, 0).toISOString(),
        end: createDate(today, 14, 0).toISOString()
      }
    })

    const resource = createResourceData({
      itemsOnTimeline: [item1, item2, item3]
    })

    const removed = removeItemFromResource(resource, item2)
    expect(removed.itemsOnTimeline).toEqual([item1, item3])
  })
})
