import {Input} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC, useEffect} from 'react'
import {classNames} from '../../utils/helpers/classNames'
import cls from './ProfileInputs.module.css'
import {useFormAndValidation} from "../../utils/hooks/useFormAndValidation";
import {useAppSelector} from "../../utils/hooks/reduxTypedHooks";

export const ProfileInputs: FC = () => {
    const {user} = useAppSelector((state) => state.user)
    const {name, email} = user
    const {values, isValid, setValues, handleChange} = useFormAndValidation({
        name: name,
        email: email,
        password: '******'
    })

    useEffect(() => {
        setValues({name: name, email: email, password: '******'})
    }, [name, email])
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
            />
            <Input
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder={'Логин'}
                icon="EditIcon"
                minLength={3}
                error={isValid.email}
            />
            <Input
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder={'Пароль'}
                icon="EditIcon"
                minLength={3}
                error={isValid.password}
            />
        </section>
    )
}
