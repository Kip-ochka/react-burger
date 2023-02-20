import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { moveIngridient, removeIngridient } from '../../store/ingridientsSlice'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { useAppDispatch } from '../../utils/hooks/reduxTypedHooks'

interface ConstructorItemProps {
  ingridient: Ingridient
  extraClass: string
  subId: number
}

export const ConstructorItem: FC<ConstructorItemProps> = (
  props: ConstructorItemProps
) => {
  const { extraClass, ingridient, subId } = props
  const dispatch = useAppDispatch()

  const [, dropElement] = useDrop({
    accept: 'element',
    hover(item, monitor) {
      dispatch(moveIngridient({ item, subId }))
    },
  })

  const [, dragRef] = useDrag({
    type: 'element',
    item: { ingridient, subId },
  })

  return (
    <div
      className={classNames('', {}, [extraClass])}
      draggable={true}
      ref={(node) => {
        dragRef(dropElement(node))
      }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingridient.name}
        price={ingridient.price}
        isLocked={false}
        thumbnail={ingridient.image}
        handleClose={() => dispatch(removeIngridient(subId))}
      />
    </div>
  )
}
