import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { memo, useState } from 'react'
import { TEXT } from 'react-dnd-html5-backend/dist/NativeTypes'
import { Link, useNavigate } from 'react-router-dom'
import { PageLayout } from '../../../components/PageLayout/PageLayout'
import Preloader from '../../../components/Preloader/Preloader'
import { fetchRegister } from '../../../store/userSlice'
import { classNames } from '../../../utils/helpers/classNames'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../utils/hooks/reduxTypedHooks'
import { useFormAndValidation } from '../../../utils/hooks/useFormAndValidation'
import { TypografyTheme } from '../../../utils/variables'

import cls from './RegisterPage.module.css'

const RegisterPage = memo(() => {
  const [isPassword, setIsPassword] = useState(true)
  const { values, handleChange, isValid, errors } = useFormAndValidation({
    name: '',
    email: '',
    password: '',
  })
  const inputsValuses = {
    name: values.name,
    email: values.email,
    password: values.password,
  }
  const dispatch = useAppDispatch()
  const { error, userLoading } = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <PageLayout>
      {userLoading ? (
        <Preloader />
      ) : (
        <>
          <form
            className={cls.form}
            onSubmit={(e) => {
              e.preventDefault()
              dispatch(fetchRegister(inputsValuses)).then((res) => {
                if (res.type === 'user/register/fulfilled') {
                  navigate('/')
                }
              })
            }}
          >
            <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>
              Регистрация
            </h1>
            <Input
              value={values.name}
              type="text"
              placeholder="Имя"
              onChange={handleChange}
              name="name"
              error={!isValid}
              errorText={errors.name}
              required={true}
              minLength={3}
            />
            <Input
              value={values.email}
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              name="email"
              error={!isValid}
              errorText={errors.email}
              minLength={3}
            />
            <Input
              value={values.password}
              type={isPassword ? 'password' : 'text'}
              placeholder="Пароль"
              icon={isPassword ? 'ShowIcon' : 'HideIcon'}
              onChange={handleChange}
              onIconClick={() => {
                setIsPassword(!isPassword)
              }}
              name="password"
              error={!isValid}
              errorText={errors.password}
              minLength={3}
            />
            <Button htmlType="submit" disabled={!isValid}>
              Регистрация
            </Button>
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
                className={classNames(TEXT, {}, [
                  TypografyTheme.default,
                  cls.link,
                ])}
              >
                Войти
              </Link>
            </div>
            <p
              className={classNames(TEXT, {}, [
                TypografyTheme.default,
                cls.error,
              ])}
            >
              {error}
            </p>
          </div>
        </>
      )}
    </PageLayout>
  )
})

export default RegisterPage
