import { nanoid } from '@reduxjs/toolkit'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { removeIngridient } from '../../store/ingridientsSlice'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { useAppDispatch } from '../../utils/hooks/reduxTypedHooks'

interface ConstructorItemProps {
  ingridient: Ingridient
  extraClass: string
  subId: number
}

function ConstructorItem(props: ConstructorItemProps) {
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
        handleClose={() => {
          dispatch(removeIngridient(subId))
        }}
      />
    </div>
  )
}

export default ConstructorItem
