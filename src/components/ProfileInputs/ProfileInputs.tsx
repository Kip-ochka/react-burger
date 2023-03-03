import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { classNames } from '../../utils/helpers/classNames'
import cls from './ProfileInputs.module.css'

export const ProfileInputs: FC = () => {
  return (
    <section className={classNames(cls.section)}>
      <Input
        type="text"
        value={'123'}
        onChange={() => {}}
        placeholder={'Имя'}
        icon="EditIcon"
      />
      <Input
        type="email"
        value={'123@123.ru'}
        onChange={() => {}}
        placeholder={'Логин'}
        icon="EditIcon"
      />
      <Input
        type="password"
        value={'******'}
        onChange={() => {}}
        placeholder={'Пароль'}
        icon="EditIcon"
      />
    </section>
  )
}
