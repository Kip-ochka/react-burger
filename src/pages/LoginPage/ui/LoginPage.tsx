import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC, memo, useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {PageLayout} from '../../../components/PageLayout/PageLayout'
import {classNames} from '../../../utils/helpers/classNames'
import {TEXT, TypografyTheme} from '../../../utils/variables'

import cls from './LoginPage.module.css'
import {useFormAndValidation} from "../../../utils/hooks/useFormAndValidation";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import {fetchLogin, setError} from "../../../store/userSlice";
import Preloader from "../../../components/Preloader/Preloader";

const LoginPage:FC = memo(() => {
    const [isPassword, setIsPassword] = useState(true)
    const {
        values, handleChange, errors, isValid, isButtonDisabled, resetForm,
    } = useFormAndValidation({email: '', password: ''})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {error, userLoading, isLogged} = useAppSelector((state) => state.user)

    if (isLogged) {
        return <Navigate to={"/"} replace />
    }
    return (
        <PageLayout>
            {userLoading
                ? <Preloader/>
                : (<>
                    <form
                        className={cls.form}
                        onSubmit={(e) => {
                            e.preventDefault()
                            dispatch(fetchLogin({email: values.email, password: values.password}))
                                .then(res => {
                                    if (res.type === 'user/login/fulfilled') {
                                        navigate('/')
                                        resetForm()
                                    }
                                    setTimeout(() => {
                                        dispatch(setError(null))
                                    }, 2000)
                                })
                        }}>
                        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>Вход</h1>
                        <Input
                            value={values.email}
                            error={isValid.email}
                            errorText={errors.email}
                            type="email"
                            name={'email'}
                            placeholder="E-mail"
                            onChange={handleChange}
                        />
                        <Input
                            name='password'
                            value={values.password}
                            error={isValid.password}
                            errorText={errors.email}
                            type={isPassword ? 'password' : 'text'}
                            placeholder="Пароль"
                            icon={isPassword ? 'ShowIcon' : 'HideIcon'}
                            onChange={handleChange}
                            onIconClick={() => {
                                setIsPassword(!isPassword)
                            }}
                        />
                        <Button htmlType="submit" disabled={isButtonDisabled}>Войти</Button>
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
                        <ErrorMessage error={error}/>
                    </div>
                </>)}
        </PageLayout>
    )
})

export default LoginPage
