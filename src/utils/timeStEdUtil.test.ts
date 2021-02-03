import { getMinDate, getMaxDate } from './commonUtil'

import {
  timeStEdToStr,
  isNothingTimeStEd,
  timeStEdToTimeStEdDate
} from './timeStEdUtil'

const today = new Date()

describe('timeStEdToStr', () => {
  test('時間幅がない場合', () => {
    const timeStEd = { start: '', end: '' }
    expect(timeStEdToStr(timeStEd)).toEqual('')
  })

  test('startがない場合', () => {
    const endDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      0,
      0
    )
    const timeStEd = { start: '', end: endDt.toISOString() }
    expect(timeStEdToStr(timeStEd)).toEqual(' 〜 18:00')
  })

  test('endがない場合', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    )
    const timeStEd = { start: stDt.toISOString(), end: '' }
    expect(timeStEdToStr(timeStEd)).toEqual('09:00 〜 ')
  })

  test('時間幅10:00~18:00', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    )
    const endDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      0,
      0
    )
    const timeStEd = { start: stDt.toISOString(), end: endDt.toISOString() }
    expect(timeStEdToStr(timeStEd)).toEqual('09:00 〜 18:00')
  })
})

describe('isNothingTimeStEd', () => {
  test('時間幅がない場合', () => {
    const timeStEd = { start: '', end: '' }
    expect(isNothingTimeStEd(timeStEd)).toEqual(true)
  })

  test('時間幅がある場合', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    )
    const endDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      0,
      0
    )
    const timeStEd = { start: stDt.toISOString(), end: endDt.toISOString() }
    expect(isNothingTimeStEd(timeStEd)).toEqual(false)
  })
})

describe('timeStEdToTimeStEdDate', () => {
  test('時間幅をあらわす文字列がDateに変換される', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    )
    const endDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      0,
      0
    )
    const timeStEd = { start: stDt.toISOString(), end: endDt.toISOString() }
    const toDt = timeStEdToTimeStEdDate(timeStEd)
    expect(toDt.start).toEqual(stDt)
    expect(toDt.end).toEqual(endDt)
  })

  test('startがない場合はデフォルトの最小Dateが設定される', () => {
    const endDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18,
      0,
      0
    )
    const timeStEd = { start: '', end: endDt.toISOString() }
    const toDt = timeStEdToTimeStEdDate(timeStEd)
    expect(toDt.start).toEqual(getMinDate())
  })

  test('endがない場合はデフォルトの最大Dateが設定される', () => {
    const stDt = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9,
      0,
      0
    )
    const timeStEd = { start: stDt.toISOString(), end: '' }
    const toDt = timeStEdToTimeStEdDate(timeStEd)
    expect(toDt.end).toEqual(getMaxDate())
  })
})

/**
describe("inDuringTimeStEdDate", () => {
  test("startだけが時間幅に含まれている場合", () => {
    const tStDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10, 0)
    const tEdDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0)
    const targetTimeStEdDate = { start: tStDt, end: tEdDt }

    const stDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 9, 0)
    const edDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 29, 0)
    const timeStEdDate = { start: stDt, end: edDt }

    expect(inDuringTimeStEdDate(targetTimeStEdDate, timeStEdDate)).toEqual(true)
  })

  test("endだけが時間幅に含まれている場合", () => {
    const tStDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10, 0)
    const tEdDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0)
    const targetTimeStEdDate = { start: tStDt, end: tEdDt }

    const stDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 11, 0)
    const edDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 31, 0)
    const timeStEdDate = { start: stDt, end: edDt }

    expect(inDuringTimeStEdDate(targetTimeStEdDate, timeStEdDate)).toEqual(true)
  })

  test("start~endが時間幅に含まれている場合", () => {
    const tStDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10, 0)
    const tEdDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0)
    const targetTimeStEdDate = { start: tStDt, end: tEdDt }

    const stDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10, 0)
    const edDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0)
    const timeStEdDate = { start: stDt, end: edDt }

    expect(inDuringTimeStEdDate(targetTimeStEdDate, timeStEdDate)).toEqual(true)
  })

  test("start-endが時間幅の外にある場合", () => {
    const tStDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 8, 0)
    const tEdDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 9, 0)
    const targetTimeStEdDate = { start: tStDt, end: tEdDt }

    const stDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10, 0)
    const edDt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0)
    const timeStEdDate = { start: stDt, end: edDt }

    expect(inDuringTimeStEdDate(targetTimeStEdDate, timeStEdDate)).toEqual(false)
  })
})
*/
