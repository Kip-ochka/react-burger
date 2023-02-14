import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
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

interface BurgerConstructorProps {
  onOpenOrder: () => void
}

export const BurgerConstructor = (props: BurgerConstructorProps) => {
  const { onOpenOrder } = props
  const dispatch = useAppDispatch()
  const { inConstructor } = useAppSelector((state) => state.ingridients)
  const [_, dropTarget] = useDrop({
    accept: 'ingridient',
    drop(item) {
      dispatch(addIngridient(item))
    },
  })

  const totalPrice = useMemo(() => {
    if (inConstructor.length === 0) {
      return 0
    } else {
      return (inConstructor as Ingridient[]).reduce(
        (acc: number, item: Ingridient) => {
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
        {inConstructor.map((item) => {
          return <div>хай</div>
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
