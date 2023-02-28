import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { memo } from 'react'
import { TEXT } from 'react-dnd-html5-backend/dist/NativeTypes'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../../components/PageLayout/PageLayout'
import { classNames } from '../../../utils/helpers/classNames'
import { TypografyTheme } from '../../../utils/variables'

import cls from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  return (
    <PageLayout>
      <form className={cls.form}>
        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>
          Восстановление пароля
        </h1>
        <Input
          value={''}
          type="email"
          placeholder="Укажите e-mail"
          onChange={() => {}}
        />

        <Button htmlType="submit">Восстановить</Button>
      </form>
      <div className={classNames(cls.bottomWrapper)}>
        <div className={classNames(cls.itemWrapper)}>
          <p
            className={classNames(TEXT, {}, [
              TypografyTheme.default,
              cls.question,
            ])}
          >
            Вспомнили пароль?
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

export default ForgotPasswordPage
