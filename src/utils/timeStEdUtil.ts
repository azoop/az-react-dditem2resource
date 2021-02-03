import { parseISO, isValid } from 'date-fns'
import { TimeStEdInterface, TimeStEdDateInterface } from '../interfaces' // eslint-disable-line no-unused-vars
import { getMinDate, getMaxDate } from './commonUtil'

function parseTime(time: string): Date | null {
  try {
    const dt = parseISO(time)
    if (!isValid(dt)) {
      return null
    }
    // 秒、ミリ秒は0に揃えておく
    return new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      dt.getHours(),
      dt.getMinutes(),
      0,
      0
    )
  } catch {
    return null
  }
}

function zeroTimePad(v: string) {
  return `${('00' + v).slice(-2)}`
}

function toHHMMstr(dt: Date | null): string {
  if (dt) {
    const hh = dt.getHours().toString()
    const mm = dt.getMinutes().toString()
    return `${zeroTimePad(hh)}:${zeroTimePad(mm)}`
  }
  return ''
}

export function timeStEdToStr(timeStEd: TimeStEdInterface): string {
  const st = toHHMMstr(parseTime(timeStEd.start))
  const ed = toHHMMstr(parseTime(timeStEd.end))

  if (st === '' && ed === '') {
    return ''
  }
  return `${st} 〜 ${ed}`
}

export function isNothingTimeStEd(timeStEd: TimeStEdInterface): boolean {
  if (!timeStEd?.start && !timeStEd?.end) {
    return true
  }
  return false
}

const minDate = getMinDate()
const maxDate = getMaxDate()

export function timeStEdToTimeStEdDate(
  timeStEd: TimeStEdInterface
): TimeStEdDateInterface {
  let start = parseTime(timeStEd.start)
  let end = parseTime(timeStEd.end)
  if (!start) {
    start = minDate
  }
  if (!end) {
    end = maxDate
  }
  return {
    start,
    end
  }
}

/** todo
export function inDuringTimeStEdDate(target: TimeStEdDateInterface, timeStEd: TimeStEdDateInterface): boolean {
  if (timeStEd.start <= target.start && target.start < timeStEd.end) {
    return true
  }
  if (timeStEd.start < target.end && target.end <= timeStEd.end) {
    return true
  }
  return false
}
*/
