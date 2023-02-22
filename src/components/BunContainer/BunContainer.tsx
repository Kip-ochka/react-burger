import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Reorder } from 'framer-motion'
import { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import {
  addIngridient,
  moveIngridient,
} from '../../store/burgerConstructorSlice'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/reduxTypedHooks'
import cls from './BunContainer.module.css'

interface BunContainerProps {
  item: Ingridient
  children: ReactNode
}

export const BunContainer: FC<BunContainerProps> = (props) => {
  const { item, children } = props
  const dispatch = useAppDispatch()
  const { inConstructor } = useAppSelector((state) => state.burgerConstructor)
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
      <Reorder.Group
        values={inConstructor}
        onReorder={(newOrder) => dispatch(moveIngridient(newOrder))}
        ref={dropTargetInner}
        className={classNames(
          cls.container,
          { [cls.targethover]: isHoverTarget },
          []
        )}
      >
        {children}
      </Reorder.Group>
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
