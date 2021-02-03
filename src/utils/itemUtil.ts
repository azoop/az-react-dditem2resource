import { nanoid } from '@reduxjs/toolkit'

import { isEqual as isEqualDate } from 'date-fns'

import { ItemInterface } from '../interfaces' // eslint-disable-line no-unused-vars

import { isNothingTimeStEd, timeStEdToTimeStEdDate } from './timeStEdUtil'

export function createItemData(data: any = {}): ItemInterface {
  const {
    id = nanoid(),
    type = 'task',
    name = '',
    time = { start: '', end: '' },
    allowOverlap = false
  } = data

  return {
    id,
    type,
    name,
    time,
    allowOverlap,
    extra: data
  }
}

export function isItemOverlap(
  item1: ItemInterface,
  item2: ItemInterface
): boolean {
  if (isNothingTimeStEd(item1.time) || isNothingTimeStEd(item2.time)) {
    // アイテムが時間幅を持っていない場合は
    // 時間幅は"すべて"と捉えて必ず重なっていると判定する
    return true
  }

  const t1 = timeStEdToTimeStEdDate(item1.time)
  const t2 = timeStEdToTimeStEdDate(item2.time)

  if (t1.start < t2.start && t2.start < t1.end) {
    return true
  }
  if (t1.start < t2.end && t2.end < t1.end) {
    return true
  }
  if (t1.start > t2.start && t1.end < t2.end) {
    return true
  }
  if (isEqualDate(t1.start, t2.start) || isEqualDate(t1.end, t2.end)) {
    return true
  }

  return false
}

export function comparerItem(
  item1: ItemInterface,
  item2: ItemInterface
): number {
  const t1 = timeStEdToTimeStEdDate(item1.time)
  const t2 = timeStEdToTimeStEdDate(item2.time)

  // item1 < item2
  if (t1.start < t2.start) {
    return -1
  }
  if (isEqualDate(t1.start, t2.start) && t1.end < t2.end) {
    return -1
  }

  // item1 === item2
  if (isEqualDate(t1.start, t2.start) && isEqualDate(t1.end, t2.end)) {
    return 0
  }

  // item1 > item 2
  return 1
}
