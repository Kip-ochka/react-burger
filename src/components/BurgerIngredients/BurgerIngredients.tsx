import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { classNames } from '../../utils/helpers/classNames'
import { createSections } from '../../utils/helpers/createSections'
import { useAppSelector } from '../../utils/hooks/reduxTypedHooks'
import { INGRIDIENT_TYPES, TEXT, TypografyTheme } from '../../utils/variables'
import { IngridientItem } from '../IngridientItem/IngridientItem'
import cls from './BurgerIngredients.module.css'

interface BurgerIngredientsProps {

}

interface Headers {
  [key: string]: boolean
}

export const BurgerIngredients: FC<BurgerIngredientsProps> = () => {
  const { ingredients, error } = useAppSelector((state) => state.ingridients)
  const sections = useMemo(
    () => createSections(INGRIDIENT_TYPES, ingredients),
    [ingredients]
  )
  const [current, setCurrent] = useState('Булки')
  const rootRef = useRef<HTMLUListElement | null>(null)
  const refs = useRef<HTMLElement[]>([])

  useEffect(() => {
    let headers = {} as Headers
    const observer = new IntersectionObserver(
      (entrys) => {
        for (const entry of entrys) {
          headers[entry.target.textContent!] = entry.isIntersecting
        }
        for (const header in headers) {
          if (headers[header]) {
            setCurrent(header)
            break
          }
        }
      },
      { root: rootRef.current, rootMargin: '0px 0px 0px 0px', threshold: 1 }
    )

    refs.current.forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [refs, sections])

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
          <ul className={classNames(cls.container)} ref={rootRef}>
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
