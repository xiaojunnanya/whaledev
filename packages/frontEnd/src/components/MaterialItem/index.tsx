import { useDrag } from 'react-dnd'
import { MaterialItemStyled } from './style'

export interface MaterialItemProps {
  name: string
  desc: string
}

/**
 * 设置组件可拖拽
 * @param props
 * @returns
 */
export function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  })

  return <MaterialItemStyled ref={drag}>{desc}</MaterialItemStyled>
}
