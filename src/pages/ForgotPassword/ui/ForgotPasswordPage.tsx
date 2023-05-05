import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {TEXT} from 'react-dnd-html5-backend/dist/NativeTypes'
import {Link, useNavigate} from 'react-router-dom'
import {PageLayout} from '../../../components/PageLayout/PageLayout'
import {classNames} from '../../../utils/helpers/classNames'
import {TypografyTheme} from '../../../utils/variables'
import cls from './ForgotPasswordPage.module.css'
import {useFormAndValidation} from "../../../utils/hooks/useFormAndValidation";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import {fetchForgotPassword, setError} from "../../../store/userSlice";
import Preloader from "../../../components/Preloader/Preloader";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { Navigate } from "react-router-dom";
import {FC, memo} from "react";

const ForgotPasswordPage:FC = memo(() => {
    const {
        values, handleChange, errors, isValid, isButtonDisabled, resetForm,
    } = useFormAndValidation({email: ''})
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
                            dispatch(fetchForgotPassword({email: values.emails})).then(res => {
                                if (res.type === 'user/forgotPassword/fulfilled') {
                                    navigate('/reset-password', { state: "/forgot-password" })
                                    resetForm()
                                }
                                setTimeout(() => {
                                    dispatch(setError(null))
                                }, 2000)
                            })
                        }}
                    >
                        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>
                            Восстановление пароля
                        </h1>
                        <Input
                            value={values.email}
                            type="email"
                            placeholder="Укажите e-mail"
                            onChange={handleChange}
                            error={isValid.email}
                            errorText={errors.email}
                            minLength={3}
                            name={'email'}
                        />

                        <Button htmlType="submit" disabled={isButtonDisabled}>Восстановить</Button>
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
                    <ErrorMessage error={error}/>
                </>)}

        </PageLayout>
    )
})

export default ForgotPasswordPage
