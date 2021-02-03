export interface TimeStEdInterface {
  start: string // ISO string of Date
  end: string // ISO string of Date
}

export interface TimeStEdDateInterface {
  start: Date
  end: Date
}

export interface ItemInterface {
  id: string
  type: string
  name: string
  time: TimeStEdInterface
  allowOverlap: boolean
  extra?: any
}

export interface ResourceInterface {
  id: string
  acceptTypes: Array<string>
  name: string
  canUse: boolean
  activityTime: TimeStEdInterface
  inactiveTimes: Array<TimeStEdInterface>
  itemsOnTimeline: Array<ItemInterface>
  extra?: any
}

export interface GuardProcessInterface {
  (params: any): boolean
}

export interface PreProcessInterface {
  (params: any): any
}

export interface ProcessInterface {
  (preProcessedResult: any): any
}

export interface PostProcessInterface {
  (preProcessedResult: any, processedResult: any): any
}

export interface ErrorProcessInterface {
  (e: Error): any | never
}

export interface FinallyProcessInterface {
  (params: any, actionProcessResult: any): void
}

export interface ActionProcessPropsInterface {
  guard?: GuardProcessInterface
  preProcess?: PreProcessInterface
  process?: ProcessInterface
  postProcess?: PostProcessInterface
  errorProcess?: ErrorProcessInterface
  finallyProcess?: FinallyProcessInterface
}
