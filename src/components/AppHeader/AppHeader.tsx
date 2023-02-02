import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { classNames } from '../../utils/classNames'
import { INACTIVE_COLOR, TEXT, TypografyTheme } from '../../utils/variables'
import cls from './AppHeader.module.css'

export function AppHeader() {
  return (
    <header className={classNames(cls.header, {}, ['pt-4', 'pb-4'])}>
      <div className={classNames(cls.wrapper)}>
        <nav className={classNames(cls.nav)}>
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
                  className={classNames(TEXT, { [INACTIVE_COLOR]: !isActive }, [
                    TypografyTheme.default,
                  ])}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink
            to="/orderlist"
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
                  className={classNames(TEXT, { [INACTIVE_COLOR]: !isActive }, [
                    TypografyTheme.default,
                  ])}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          to="/cabinet"
          className={classNames(cls.navLink, {}, [
            'pl-5',
            'pr-5',
            'pt-4',
            'pb-4',
          ])}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={classNames(TEXT, { [INACTIVE_COLOR]: !isActive }, [
                  TypografyTheme.default,
                ])}
              >
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </div>
    </header>
  )
}
