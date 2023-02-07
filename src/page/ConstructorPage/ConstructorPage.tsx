import React from 'react'
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor'
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import cls from './ConstructorPage.module.css'

interface ConstructorPageProps {
  ingredients: Ingridient[]
}

export const ConstructorPage = React.memo(function ConstructorPage(
  props: ConstructorPageProps
) {
  const { ingredients } = props
  return (
    <main className={classNames(cls.page)}>
      <BurgerIngredients ingridients={ingredients} />
      <BurgerConstructor ingridients={ingredients} />
    </main>
  )
})
