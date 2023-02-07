import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { createSections } from '../../utils/helpers/createSections'
import { INGRIDIENT_TYPES, TEXT, TypografyTheme } from '../../utils/variables'
import { IngridientItem } from '../IngridientItem/IngridientItem'
import cls from './BurgerIngredients.module.css'

interface BurgerIngredientsProps {
  ingridients: Ingridient[]
}

export const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const { ingridients } = props
  const sections = createSections(INGRIDIENT_TYPES, ingridients)
  const [current, setCurrent] = useState('Булки')
  const refs = useRef<HTMLHeadingElement[]>([])

  console.log(refs.current)
  return (
    <section>
      <h1 className={classNames(TEXT, {}, [TypografyTheme.large, 'mt-10'])}>
        Соберите бургер
      </h1>
      <div className={classNames(cls.tabs, {}, ['mt-5', 'mb-10'])}>
        {sections.map((section, index) => {
          return (
            <Tab
              key={section.name}
              value={section.name}
              active={current === section.name}
              onClick={() => {
                refs.current[index].scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                })
                setCurrent(section.name)
              }}
            >
              {section.name}
            </Tab>
          )
        })}
      </div>
      <ul className={classNames(cls.container)}>
        {sections.map((section, index) => {
          return (
            <li
              key={section.name}
              className={classNames(cls.section, {}, ['mb-10'])}
            >
              <h1
                className={classNames(TEXT, {}, [TypografyTheme.medium])}
                ref={(element) => {
                  refs.current[index] = element!
                }}
              >
                {section.name}
              </h1>
              <ul
                className={classNames(cls.list, {}, ['pt-6', 'mr-4', 'ml-4'])}
              >
                {section.items.map((item) => {
                  return <IngridientItem key={item._id} ingridient={item} />
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
