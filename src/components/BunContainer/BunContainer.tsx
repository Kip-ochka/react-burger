import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ReactNode, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import { addIngridient } from '../../store/ingridientsSlice'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { useAppDispatch } from '../../utils/hooks/reduxTypedHooks'
import cls from './BunContainer.module.css'

interface BunContainerProps {
  item: Ingridient
  children: ReactNode
}

function BunContainer(props: BunContainerProps) {
  const { item, children } = props
  const dispatch = useAppDispatch()

  const [{ isHoverTarget }, dropTargetInner] = useDrop({
    accept: ['main', 'sauce'],
    drop(item: { ingridient: Ingridient }) {
      dispatch(addIngridient(item))
    },
    collect: (monitor) => ({
      isHoverTarget: monitor.isOver(),
    }),
  })

  return (
    <div>
      <ConstructorElement
        text={`${item.name} (верх)`}
        price={item.price}
        type="top"
        isLocked={true}
        thumbnail={item.image}
        extraClass={classNames(cls.item, {}, ['ml-8', 'mb-4'])}
      />
      <div
        ref={dropTargetInner}
        className={classNames(
          cls.container,
          { [cls.targethover]: isHoverTarget },
          []
        )}
      >
        {children}
      </div>
      <ConstructorElement
        text={`${item.name} (низ)`}
        price={item.price}
        type="bottom"
        isLocked={true}
        thumbnail={item.image}
        extraClass={classNames(cls.item, {}, ['ml-8', 'mt-4'])}
      />
    </div>
  )
}

export default BunContainer
