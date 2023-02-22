import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { removeIngridient } from '../../store/burgerConstructorSlice'
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

  return (
    <div className={classNames('', {}, [extraClass])} draggable={true}>
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
