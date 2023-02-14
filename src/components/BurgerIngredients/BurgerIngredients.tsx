import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo, useRef, useState } from 'react'
import { Ingridient } from '../../types/ingridient'
import { classNames } from '../../utils/helpers/classNames'
import { createSections } from '../../utils/helpers/createSections'
import { useAppSelector } from '../../utils/hooks/reduxTypedHooks'
import { INGRIDIENT_TYPES, TEXT, TypografyTheme } from '../../utils/variables'
import { IngridientItem } from '../IngridientItem/IngridientItem'
import cls from './BurgerIngredients.module.css'

interface BurgerIngredientsProps {
  onOpen: (data: Ingridient) => void
}

export const BurgerIngredients = (props: BurgerIngredientsProps) => {
  const { onOpen } = props
  const { ingridientList, error } = useAppSelector((state) => state.ingridients)
  const sections = useMemo(
    () => createSections(INGRIDIENT_TYPES, ingridientList),
    [ingridientList]
  )
  const [current, setCurrent] = useState('Булки')
  const refs = useRef<HTMLHeadingElement[]>([])

  return (
    <section>
      <h1 className={classNames(TEXT, {}, [TypografyTheme.large, 'mt-10'])}>
        Соберите бургер
      </h1>
      {error ? (
        <p
          className={classNames(TEXT, {}, [TypografyTheme.medium, 'mt-10'])}
        >{`Произошла ошибка ${error} - ингредиенты не найдены`}</p>
      ) : (
        <>
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
                    className={classNames(cls.list, {}, [
                      'pt-6',
                      'mr-4',
                      'ml-4',
                    ])}
                  >
                    {section.items.map((item) => {
                      return (
                        <IngridientItem
                          key={item._id}
                          ingridient={item}
                          onOpen={onOpen}
                        />
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
