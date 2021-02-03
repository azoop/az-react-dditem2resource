import * as React from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'

const AzDDItem2ResourceProvider = (props: any) => {
  const {
    store, // required
    children
  } = props

  return (
    <Provider store={store}>
      <DndProvider options={HTML5toTouch}>{children}</DndProvider>
    </Provider>
  )
}

export { AzDDItem2ResourceProvider }
