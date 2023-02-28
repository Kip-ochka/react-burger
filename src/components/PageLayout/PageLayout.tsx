import { FC, ReactNode } from 'react'
import { classNames } from '../../utils/helpers/classNames'
import cls from './PageLayout.module.css'

interface PageLayoutProps {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children } = props
  return <main className={classNames(cls.mainLayout)}>{children}</main>
}
