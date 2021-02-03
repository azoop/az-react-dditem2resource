import { useDrag } from 'react-dnd'
import { ItemInterface } from '../interfaces' // eslint-disable-line no-unused-vars

const defaultProps = {
  collect: (monitor: any) => ({
    isDragging: !!monitor.isDragging()
  })
}

const useDragItem = (item: ItemInterface, props: any = {}) => {
  // see: https://react-dnd.github.io/react-dnd/docs/api/use-drag
  const [collectedProps, drag, preview] = useDrag({
    item,
    ...{ ...defaultProps, ...props }
  })

  return {
    collectedProps,
    drag,
    preview
  }
}

export { useDragItem }
