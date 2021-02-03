import { ActionProcessPropsInterface } from '../interfaces' // eslint-disable-line no-unused-vars

export const deepCopy = require('rfdc/default')

export function getMinDate(): Date {
  return new Date(-8640000000000000)
}

export function getMaxDate(): Date {
  return new Date(8640000000000000)
}

export function getBeginningOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  )
}

export function getEndOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    99
  )
}

export function wrapToAsyncFunction<T>(value: T): () => Promise<T> {
  const asyncFunction = async () => {
    return value
  }
  return asyncFunction
}

// -- start [createActionProcess]
const defaultGuard = (_params: any) => true
const defaultPreProcess = (params: any) => params
const defaultProcess = (_preProcessedResult: any) => true
const defaultPostProcess = (_preProcessedResult: any, processedResult: any) =>
  processedResult
const defaultErrorProcess = (e: Error) => {
  throw e
}
const defaultFinallyProcess = (_params: any, _result: any) => null

export function createActionProcess(
  actionProps: ActionProcessPropsInterface = {}
): (params: any) => any {
  const {
    guard = defaultGuard,
    preProcess = defaultPreProcess,
    process = defaultProcess,
    postProcess = defaultPostProcess,
    errorProcess = defaultErrorProcess,
    finallyProcess = defaultFinallyProcess
  } = actionProps

  return (params) => {
    const result = {
      guard: false,
      preProcessedResult: null,
      preProcess: '',
      processedResult: null,
      process: '',
      postProcessedResult: null,
      postProcess: '',
      error: null
    }
    // 処理開始
    try {
      // ガード処理: パラメータの検査をする
      result.guard = guard(params)
      if (!result.guard) {
        // ガード処理の結果が `false` の場合は終了
        return
      }
      // 前処理: 必要であればパラメータを変換する
      const preProcessedResult = preProcess(params)
      result.preProcessedResult = preProcessedResult
      result.preProcess = 'ok'
      // メイン処理
      const processedResult = process(preProcessedResult)
      result.processedResult = processedResult
      result.process = 'ok'
      // 後処理
      const postProcessedResult = postProcess(
        preProcessedResult,
        processedResult
      )
      result.postProcessedResult = postProcessedResult
      result.postProcess = 'ok'

      return postProcessedResult
    } catch (e) {
      result.error = e
      errorProcess(e)
    } finally {
      finallyProcess(params, result)
    }
  }
}
// -- end [createActionProcess]
