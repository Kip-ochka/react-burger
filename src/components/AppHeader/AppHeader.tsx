import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { classNames } from '../../utils/helpers/classNames'
import { INACTIVE_COLOR, TEXT, TypografyTheme } from '../../utils/variables'
import cls from './AppHeader.module.css'

export const AppHeader: FC = React.memo(() => {
  return (
    <header className={classNames(cls.header, {}, ['pt-4', 'pb-4'])}>
      <nav className={classNames(cls.nav)}>
        <div className={classNames(cls.wrapper)}>
          <NavLink
            to="/"
            className={classNames(cls.navLink, {}, [
              'pl-5',
              'pr-5',
              'pt-4',
              'pb-4',
            ])}
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={classNames(
                    cls.link_text,
                    { [INACTIVE_COLOR]: !isActive },
                    [TypografyTheme.default, 'ml-2', TEXT]
                  )}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/feed"
            className={classNames(cls.navLink, {}, [
              'pl-5',
              'pr-5',
              'pt-4',
              'pb-4',
            ])}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={classNames(
                    cls.link_text,
                    { [INACTIVE_COLOR]: !isActive },
                    [TypografyTheme.default, 'ml-2', TEXT]
                  )}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>

        <Logo />

        <NavLink
          to="/profile"
          className={classNames(cls.navLink, {}, [
            'pl-5',
            'pr-5',
            'pt-4',
            'pb-4',
            cls.right,
          ])}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={classNames(
                  cls.link_text,
                  { [INACTIVE_COLOR]: !isActive },
                  [TypografyTheme.default, 'ml-2', TEXT]
                )}
              >
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  )
})
