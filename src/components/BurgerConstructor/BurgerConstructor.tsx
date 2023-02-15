import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react'
import { useDrop } from 'react-dnd'
import { addIngridient } from '../../store/ingridientsSlice'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/reduxTypedHooks'
import cls from './BurgerConstructor.module.css'
import ConstructorItem from '../ConstructorItem/ConstructorItem'

interface BurgerConstructorProps {
  onOpenOrder: () => void
}

export const BurgerConstructor = (props: BurgerConstructorProps) => {
  const { onOpenOrder } = props
  const dispatch = useAppDispatch()
  const { inConstructor } = useAppSelector((state) => state.ingridients)
  const [_, dropTarget] = useDrop({
    accept: 'bun',
    drop(item: { ingridient: Ingridient }) {
      dispatch(addIngridient(item))
    },
  })
  const [, dropTargetInner] = useDrop({
    accept: ['main', 'sauce'],
    drop(item: { ingridient: Ingridient }) {
      dispatch(addIngridient(item))
    },
  })

  const totalPrice = useMemo(() => {
    if (inConstructor.length === 0) {
      return 0
    } else {
      return (inConstructor as Ingridient[]).reduce(
        (acc: number, item: Ingridient) => {
          if (item.type === 'bun') {
            return acc + item.price * 2
          }
          return acc + item.price
        },
        0
      )
    }
  }, [inConstructor])

  return (
    <section className={classNames(cls.section, {}, ['mt-25'])}>
      <div
        ref={dropTarget}
        className={classNames(cls.constructorWrapper, {}, [])}
      >
        {inConstructor.map((item, index) => {
          if (item.type === 'bun') {
            return (
              <div key={index}>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  type="top"
                  isLocked={true}
                  thumbnail={item.image}
                  extraClass={classNames(cls.item, {}, ['ml-8', 'mb-4'])}
                />
                <div ref={dropTargetInner} className={cls.container}>
                  {inConstructor.map((item, index) => {
                    if (item.type !== 'bun') {
                      return (
                        <ConstructorItem
                          key={index}
                          extraClass={cls.item}
                          ingridient={item}
                          subId={index}
                        />
                      )
                    }
                  })}
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  type="bottom"
                  isLocked={true}
                  thumbnail={item.image}
                  extraClass={classNames(cls.item, {}, ['ml-8', 'mt-4'])}
                />
              </div>
            )
          }
        })}
      </div>
      <div className={classNames(cls.order, {}, ['mt-10', 'mr-8'])}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <div className={classNames(cls.icon, {}, ['ml-2', 'mr-10'])}>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onOpenOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}
