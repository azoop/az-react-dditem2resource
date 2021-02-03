import { nanoid } from '@reduxjs/toolkit'

import { ResourceInterface, ItemInterface } from '../interfaces' // eslint-disable-line no-unused-vars

import { isNothingTimeStEd, timeStEdToTimeStEdDate } from './timeStEdUtil'

import { isItemOverlap, comparerItem } from './itemUtil'

const deepCopy = require('rfdc/default')

export function createResourceData(data: any = {}): ResourceInterface {
  const {
    id = nanoid(),
    acceptTypes = ['task'],
    name = '',
    canUse = true,
    activityTime = { start: '', end: '' },
    inactiveTimes = [],
    itemsOnTimeline = []
  } = data

  return {
    id,
    acceptTypes,
    name,
    canUse,
    activityTime,
    inactiveTimes,
    itemsOnTimeline,
    extra: data
  }
}

export function isItemInActivityTime(
  resource: ResourceInterface,
  item: ItemInterface
): boolean {
  if (
    isNothingTimeStEd(resource.activityTime) ||
    isNothingTimeStEd(item.time)
  ) {
    // a. 活動時間が設定されていない場合は、全時間が活動時間とする
    // b. アイテムに時間が設定されていない場合は、活動時間内のアイテムとみなす
    return true
  }

  const at = timeStEdToTimeStEdDate(resource.activityTime)
  const it = timeStEdToTimeStEdDate(item.time)

  if (it.start < at.start || at.end < it.start) {
    return false
  }

  return true
}

export function isItemInInactiveTimes(
  resource: ResourceInterface,
  item: ItemInterface
): boolean {
  if (resource.inactiveTimes.length === 0) {
    // 非活動時間がない
    return false
  }
  if (resource.inactiveTimes.length > 0 && isNothingTimeStEd(item.time)) {
    // アイテムに時間が設定されていない場合は全時間と捉える
    // この場合に1つでも非活動時間がある場合は必ず true になる
    return true
  }

  const it = timeStEdToTimeStEdDate(item.time)
  return resource.inactiveTimes.some((iat) => {
    const t = timeStEdToTimeStEdDate(iat)
    if (it.start <= t.start && t.end <= it.end) {
      // アイテムの時間が非活動時間を丸ごと含んでいる場合
      // 非活動時間をつぶしているので、非活動時間内だと判定する
      return true
    }
    if (it.start < t.start || t.end < it.start) {
      return false
    }
    return true
  })
}

export function countOverlappedItemsInResource(
  resource: ResourceInterface,
  item: ItemInterface
): number {
  let cnt = 0
  resource.itemsOnTimeline.forEach((i: ItemInterface) => {
    if (isItemOverlap(i, item)) {
      cnt++
    }
  })
  return cnt
}

export function findOverlappedItemsInResource(
  resource: ResourceInterface,
  item: ItemInterface
): Array<ItemInterface> {
  const overlappedItems = resource.itemsOnTimeline.filter(
    (i: ItemInterface) => {
      return isItemOverlap(item, i)
    }
  )
  return deepCopy(overlappedItems)
}

export function canAddItemToResource(
  resource: ResourceInterface,
  item: ItemInterface
): boolean {
  if (!resource.canUse) {
    // 利用できないリソースの場合は追加できない
    return false
  }

  if (!isItemInActivityTime(resource, item)) {
    // 活動時間外のアイテムは追加できない
    return false
  }
  if (isItemInInactiveTimes(resource, item)) {
    // 非活動時間内のアイテムは追加できない
    return false
  }

  const overlappedItems = findOverlappedItemsInResource(resource, item)
  if (!item.allowOverlap && overlappedItems.length > 0) {
    // 重複が許可されていないアイテムで、時間が重なっている場合は追加できない
    return false
  }
  const allowOverlappedItems = overlappedItems.every((i) => i.allowOverlap)
  if (item.allowOverlap && !allowOverlappedItems) {
    return false
  }
  return true
}

export function addItemToResource(
  resource: ResourceInterface,
  item: ItemInterface
): ResourceInterface {
  const copied = deepCopy(resource)
  copied.itemsOnTimeline.push(item)
  copied.itemsOnTimeline.sort(comparerItem)
  return copied
}

export function removeItemFromResource(
  resource: ResourceInterface,
  item: ItemInterface
): ResourceInterface {
  const copied = deepCopy(resource)
  copied.itemsOnTimeline = copied.itemsOnTimeline.filter(
    (i: ItemInterface) => i.id !== item.id
  )
  return copied
}
