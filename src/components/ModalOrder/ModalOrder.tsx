import { classNames } from '../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../utils/variables'
import { ReactComponent as Done } from '../../images/icons/graphics.svg'
import cls from './ModalOrder.module.css'
import { useAppSelector } from '../../utils/hooks/reduxTypedHooks'
import { FC } from 'react'

export const ModalOrder: FC = () => {
  const { order } = useAppSelector((state) => state.ingridients)

  return (
    <>
      <p
        className={classNames(TEXT, {}, [
          TypografyTheme.digitsLarge,
          'mt-4',
          cls.shadow,
        ])}
      >
        {order?.order?.number}
      </p>
      <p className={classNames(TEXT, {}, [TypografyTheme.medium, 'mt-8'])}>
        идентификатор заказа
      </p>
      <Done className={classNames(cls.done, {}, ['mt-15'])} />
      <p className={classNames(TEXT, {}, [TypografyTheme.default, 'mt-15'])}>
        Ваш заказ начали готовить
      </p>
      <p
        className={classNames(TEXT, {}, [
          TypografyTheme.default,
          'mt-2',
          'mb-30',
          cls.color,
        ])}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  )
}
