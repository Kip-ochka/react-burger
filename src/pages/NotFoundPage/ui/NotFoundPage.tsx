import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {useNavigate} from 'react-router-dom'
import {classNames} from '../../../utils/helpers/classNames'
import {TEXT, TypografyTheme} from '../../../utils/variables'

import cls from './NotFound.module.css'
import {FC} from "react";

const NotFoundPage: FC = () => {
    const navigate = useNavigate()
    return (

        <div className={classNames(cls.wrapper)}>
            <h1
                className={classNames(TEXT, {}, [TypografyTheme.large, cls.shadow])}
            >
                PAGE NOT FOUND
            </h1>
            <p
                className={classNames(TEXT, {}, [
                    TypografyTheme.digitsLarge,
                    cls.shadow,
                ])}
            >
                404
            </p>
            <Button htmlType="button" type="secondary" onClick={() => navigate(-1)}>
                Вернуться назад
            </Button>
        </div>

    )
}

export default NotFoundPage
