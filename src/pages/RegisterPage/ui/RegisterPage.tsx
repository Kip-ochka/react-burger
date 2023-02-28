import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState } from 'react'
import { TEXT } from 'react-dnd-html5-backend/dist/NativeTypes'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../../components/PageLayout/PageLayout'
import { classNames } from '../../../utils/helpers/classNames'
import { TypografyTheme } from '../../../utils/variables'

import cls from './RegisterPage.module.css'

const RegisterPage = () => {
  const [isPassword, setIsPassword] = useState(true)
  return (
    <PageLayout>
      <form className={cls.form}>
        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>
          Регистрация
        </h1>
        <Input value={''} type="text" placeholder="Имя" onChange={() => {}} />
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
        <Button htmlType="submit">Регистрация</Button>
      </form>
      <div className={classNames(cls.bottomWrapper)}>
        <div className={classNames(cls.itemWrapper)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.question,
            ])}
          >
            Уже зарегестрированы?
          </p>
          <Link
            to="/login"
            className={classNames(TEXT, {}, [TypografyTheme.default, cls.link])}
          >
            Войти
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

export default RegisterPage
