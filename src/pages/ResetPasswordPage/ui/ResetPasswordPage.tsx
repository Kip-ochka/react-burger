import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {useState} from 'react'
import {TEXT} from 'react-dnd-html5-backend/dist/NativeTypes'
import {Link, useNavigate} from 'react-router-dom'
import {PageLayout} from '../../../components/PageLayout/PageLayout'
import {classNames} from '../../../utils/helpers/classNames'
import {TypografyTheme} from '../../../utils/variables'
import cls from './ResetPasswordPage.module.css'
import {useFormAndValidation} from "../../../utils/hooks/useFormAndValidation";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Preloader from "../../../components/Preloader/Preloader";
import {fetchResetPassword} from "../../../store/userSlice";

const ResetPasswordPage = () => {
    const [isPassword, setIsPassword] = useState(true)
    const {
        values, handleChange, errors, isValid, isButtonDisabled, resetForm,
    } = useFormAndValidation({password: '', code:''})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {error, userLoading} = useAppSelector((state) => state.user)
    return (
        <PageLayout>
            {userLoading
                ? <Preloader/>
                : (<>
                    <form
                        className={cls.form}
                        onSubmit={(e) => {
                            e.preventDefault()
                            dispatch(fetchResetPassword({password: values.password, code: values.code})).then((res)=>{
                                if (res.type === 'user/resetPassword/fulfilled') {
                                    navigate('/login')
                                    resetForm()
                                }
                            })
                        }}
                    >
                        <h1 className={classNames(TEXT, {}, [TypografyTheme.medium])}>
                            Восстановление пароля
                        </h1>
                        <Input
                            value={values.password}
                            name={'password'}
                            type={isPassword ? 'password' : 'text'}
                            placeholder="Пароль"
                            icon={isPassword ? 'ShowIcon' : 'HideIcon'}
                            onChange={handleChange}
                            onIconClick={() => {
                                setIsPassword(!isPassword)
                            }}
                            error={isValid.password}
                            errorText={errors.password}
                            minLength={3}
                        />
                        <Input
                            value={values.code}
                            name={'code'}
                            type="text"
                            placeholder="Введите код из письма"
                            onChange={handleChange}
                            error={isValid.code}
                            errorText={errors.code}
                            minLength={1}
                        />
                        <Button htmlType="submit" disabled={isButtonDisabled}>Сохранить</Button>
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
                        <ErrorMessage error={error}/>
                    </div>
                </>)}

        </PageLayout>
    )
}

export default ResetPasswordPage
