import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../../components/PageLayout/PageLayout'
import { classNames } from '../../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../../utils/variables'

import cls from './LoginPage.module.css'

const LoginPage = memo(() => {
  const [isPassword, setIsPassword] = useState(true)

  return (
    <PageLayout>
      <form className={cls.form}>
        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>Вход</h1>
        <Input
          value={''}
          type="email"
          placeholder="E-mail"
          onChange={() => {}}
        />
        <Input
          value={''}
          type={isPassword ? 'password' : 'text'}
          placeholder="Пароль"
          icon={isPassword ? 'ShowIcon' : 'HideIcon'}
          onChange={() => {}}
          onIconClick={() => {
            setIsPassword(!isPassword)
          }}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <div className={classNames(cls.bottomWrapper)}>
        <div className={classNames(cls.itemWrapper)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.question,
            ])}
          >
            Вы - новый пользователь?
          </p>
          <Link
            to="/register"
            className={classNames(TEXT, {}, [TypografyTheme.default, cls.link])}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={classNames(cls.itemWrapper)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.question,
            ])}
          >
            Забыли пароль?
          </p>
          <Link
            to="/forgot-password"
            className={classNames(TEXT, {}, [TypografyTheme.default, cls.link])}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </PageLayout>
  )
})

export default LoginPage
