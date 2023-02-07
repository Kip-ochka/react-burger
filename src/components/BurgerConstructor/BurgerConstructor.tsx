import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { bunImage } from '../../utils/variables'
import cls from './BurgerConstructor.module.css'

interface BurgerConstructorProps {
  ingridients: Ingridient[]
}

export const BurgerConstructor = (props: BurgerConstructorProps) => {
  const { ingridients } = props

  const totalPrice = React.useMemo(() => {
    return ingridients.reduce((acc, item) => {
      return acc + item.price
    }, 0)
  }, [ingridients])

  return (
    <section className={classNames(cls.section, {}, ['mt-25'])}>
      <div className={classNames('', {}, ['ml-8'])}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bunImage}
        />
      </div>
      <div className={classNames(cls.container)}>
        {ingridients
          .filter((item) => item.type !== 'bun')
          .map((item) => {
            return (
              <div className={classNames(cls.item)}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            )
          })}
      </div>
      <div className={classNames('', {}, ['ml-8'])}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bunImage}
        />
      </div>
      <div className={classNames(cls.order, {}, ['mt-10', 'mr-8'])}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <div className={classNames(cls.icon, {}, ['ml-2', 'mr-10'])}>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
