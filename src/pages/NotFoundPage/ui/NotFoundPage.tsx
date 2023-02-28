import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../../../components/PageLayout/PageLayout'
import { classNames } from '../../../utils/helpers/classNames'
import { TEXT, TypografyTheme } from '../../../utils/variables'

import cls from './NotFound.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <PageLayout>
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
    </PageLayout>
  )
}

export default NotFoundPage
