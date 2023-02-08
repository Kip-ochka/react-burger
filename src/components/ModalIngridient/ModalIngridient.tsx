import React from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../utils/variables'
import cls from './ModalIngridient.module.css'

interface ModalIngridientProps {
  ingridient: Ingridient | {}
}

function ModalIngridient(props: ModalIngridientProps) {
  const { ingridient } = props

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingridient as Ingridient
  return (
    <>
      <img src={image_large} />
      <p className={classNames(TEXT, {}, [TypografyTheme.medium, 'mt-4'])}>
        {name}
      </p>
      <ul className={classNames(cls.wrapper)}>
        <li className={classNames(cls.item)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.color,
            ])}
          >
            Калории,ккал
          </p>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.digitsDefault,
              cls.color,
            ])}
          >
            {calories}
          </p>
        </li>
        <li className={classNames(cls.item)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.color,
            ])}
          >
            Белки,г
          </p>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.digitsDefault,
              cls.color,
            ])}
          >
            {proteins}
          </p>
        </li>
        <li className={classNames(cls.item)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.color,
            ])}
          >
            Жиры,г
          </p>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.digitsDefault,
              cls.color,
            ])}
          >
            {fat}
          </p>
        </li>
        <li className={classNames(cls.item)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.color,
            ])}
          >
            Углеводы,г
          </p>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.digitsDefault,
              cls.color,
            ])}
          >
            {carbohydrates}
          </p>
        </li>
      </ul>
    </>
  )
}

export default ModalIngridient
