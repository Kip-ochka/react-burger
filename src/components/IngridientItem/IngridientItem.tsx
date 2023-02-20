import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { useAppSelector } from '../../utils/hooks/reduxTypedHooks'
import { TEXT, TypografyTheme } from '../../utils/variables'
import cls from './IngridientItem.module.css'

interface IngridientItemProps {
  ingridient: Ingridient
  onOpen: (data: Ingridient) => void
}

export const IngridientItem: FC<IngridientItemProps> = (props) => {
  const { ingridient, onOpen } = props

  const { inConstructor } = useAppSelector((state) => state.ingridients)

  const [, dragRef] = useDrag({
    type: ingridient.type,
    item: { ingridient },
  })

  const count = useMemo(() => {
    return inConstructor.filter((item) => {
      return item._id === ingridient._id
    }).length
  }, [inConstructor, ingridient._id])

  return (
    <li
      ref={dragRef}
      draggable={true}
      className={classNames(cls.container)}
      onClick={() => {
        onOpen(ingridient)
      }}
    >
      <img
        src={ingridient.image}
        className={classNames(cls.img, {}, ['ml-4', 'mr-4'])}
        alt={`${ingridient.name}`}
      />
      <div className={classNames(cls.priceWrapper)}>
        <p
          className={classNames(TEXT, {}, [
            TypografyTheme.digitsDefault,
            'mt-1',
            'mb-2',
          ])}
        >
          {ingridient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames(TEXT, {}, [TypografyTheme.default])}>
        {ingridient.name}
      </p>
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
    </li>
  )
}
