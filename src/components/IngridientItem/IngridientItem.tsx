import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../utils/variables'
import cls from './IngridientItem.module.css'
interface IngridientItemProps {
  ingridient: Ingridient
}

export const IngridientItem = (props: IngridientItemProps) => {
  const { ingridient } = props
  const [count, setCount] = useState(0)
  return (
    <li className={classNames(cls.container)}>
      <img
        src={ingridient.image}
        className={classNames(cls.img, {}, ['ml-4', 'mr-4'])}
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
