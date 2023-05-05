import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC, memo, useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {PageLayout} from '../../../components/PageLayout/PageLayout'
import Preloader from '../../../components/Preloader/Preloader'
import {fetchRegister, setError} from '../../../store/userSlice'
import {classNames} from '../../../utils/helpers/classNames'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../utils/hooks/reduxTypedHooks'
import {useFormAndValidation} from '../../../utils/hooks/useFormAndValidation'
import {TypografyTheme, TEXT} from '../../../utils/variables'

import cls from './RegisterPage.module.css'
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

const RegisterPage:FC = memo(() => {
    const [isPassword, setIsPassword] = useState(true)
    const {values, handleChange, isValid, errors, isButtonDisabled, resetForm} = useFormAndValidation({
        name: '',
        email: '',
        password: '',
    })
    const inputsValues = {
        name: values.name,
        email: values.email,
        password: values.password,
    }
    const dispatch = useAppDispatch()
    const {error, userLoading, isLogged} = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    if (isLogged) {
        return <Navigate to={"/"} replace/>
    }
    return (
        <PageLayout>
            {userLoading ? (
                <Preloader/>
            ) : (
                <>
                    <form
                        className={cls.form}
                        onSubmit={(e) => {
                            e.preventDefault()
                            dispatch(fetchRegister(inputsValues)).then((res) => {
                                if (res.type === 'user/register/fulfilled') {
                                    navigate('/')
                                    resetForm()
                                }
                                setTimeout(() => {
                                    dispatch(setError(null))
                                }, 2000)
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
                            error={isValid.name}
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
                            error={isValid.email}
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
                            error={isValid.password}
                            errorText={errors.password}
                            minLength={3}
                        />
                        <Button htmlType="submit" disabled={isButtonDisabled}>
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
                        <ErrorMessage error={error}/>
                    </div>
                </>
            )}
        </PageLayout>
    )
})

export default RegisterPage
