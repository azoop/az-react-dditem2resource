declare module 'react-dnd-multi-backend' {
  import { FC, ReactNode } from 'react' // eslint-disable-line no-unused-vars
  import { MultiBackend, MultiBackendOptions } from 'dnd-multi-backend' // eslint-disable-line no-unused-vars
  import { usePreviewState } from 'react-dnd-preview' // eslint-disable-line no-unused-vars

  export const DndProvider: FC<{
    context?: any
    options: MultiBackendOptions
    children?: ReactNode
    debugMode?: boolean
    portal?: Element
  }>

  export function usePreview(): usePreviewState
}
