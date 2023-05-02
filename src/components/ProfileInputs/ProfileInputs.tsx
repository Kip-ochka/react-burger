import { Input} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {FC, useEffect, useState} from 'react'
import {classNames} from '../../utils/helpers/classNames'
import cls from './ProfileInputs.module.css'
import {useFormAndValidation} from "../../utils/hooks/useFormAndValidation";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {setError, setUser} from "../../store/userSlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export const ProfileInputs: FC = () => {
    const {user, error} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const {name, email} = user
    const {values, isValid, setIsValid, setValues, handleChange, errors} = useFormAndValidation({
        name: name,
        email: email,
        password: '******'
    })
    const [isChange, setIsChange] = useState({name: false, email: false, password: false})
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (error) {
            dispatch(setError(null))
        }
        setIsChange({...isChange, [e.target.name]: true})
    }

    const handleLeaveFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputName = e.target.name
        const isPassword = inputName === 'password'
        if (!isPassword) {
            const same = Object.values(user).filter(el => el === values[inputName]).length
            if (!!same) {
                setValues({
                    name: name,
                    email: email,
                    password: '******'
                })
                return
            }
        }

        if (isPassword && (values[inputName] === '' || values[inputName] === '******')) {
            setValues({
                name: name,
                email: email,
                password: '******'
            })
            setIsValid({...isValid, [inputName]: false})
            return
        }

        if (!isValid[inputName]) {
            dispatch(setUser({data: {[inputName]: values[inputName]}})).then(res => {
                if (res.type !== 'user/setUser/fulfilled') {
                    setTimeout(() => {
                        dispatch(setError(null))
                    }, 2000)
                }
            })
            return
        }

        dispatch(setError(`Поле ${inputName} некорректно`))
    }

    useEffect(() => {
        setValues({name: name, email: email, password: '******'})
    }, [name, email, setValues])

    return (
        <section className={classNames(cls.section)}>
            <Input
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder={'Имя'}
                icon="EditIcon"
                minLength={2}
                error={isValid.name}
                onFocus={handleFocus}
                onBlur={handleLeaveFocus}
                readOnly={!isChange.name}
                name={'name'}
                required
            />
            <Input
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder={'Логин'}
                icon="EditIcon"
                minLength={3}
                error={isValid.email}
                errorText={errors.email}
                onFocus={handleFocus}
                onBlur={handleLeaveFocus}
                readOnly={!isChange.email}
                name={'email'}
                required
            />
            <Input
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder={'Пароль'}
                icon="EditIcon"
                minLength={3}
                error={isValid.password}
                onFocus={(e) => {
                    setIsValid({...isValid, password: true})
                    setValues({...values, password: ''})
                    handleFocus(e!)
                }}
                onBlur={handleLeaveFocus}
                readOnly={!isChange.password}
                name={'password'}
                required
            />

            {<div className={classNames(cls.buttonWrapper)}>
                <ErrorMessage error={error}/>
            </div>}
        </section>
    )
}
